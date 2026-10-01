import axios from 'axios';
import { API_GATEWAY } from './constant.js';

// Registered callbacks for when authentication completely fails (e.g. token expired and refresh failed)
let authFailureListeners = [];

export const onAuthFailure = (callback) => {
  authFailureListeners.push(callback);
  return () => {
    authFailureListeners = authFailureListeners.filter((cb) => cb !== callback);
  };
};

const triggerAuthFailure = () => {
  authFailureListeners.forEach((cb) => {
    try {
      cb();
    } catch (err) {
      console.error('Error executing auth failure listener:', err);
    }
  });
};

const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const ApiClient = axios.create({
  baseURL: API_GATEWAY,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json, application/hal+json'
  }
});

// Request Interceptor: Attach JWT Bearer token to headers
ApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Unauthorized by calling /users/refresh with refreshToken
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

ApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error response is 401 Unauthorized or backend unauthenticated response
    const isAuthError =
      error.response &&
      (error.response.status === 401 ||
        (error.response.status === 404 &&
          error.response.data?.message === 'User is not authenticated'));

    if (!isAuthError) {
      return Promise.reject(error);
    }

    // Do not attempt refresh on unretriable requests or if already retried
    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    const requestUrl = originalRequest.url || '';

    // If login attempt failed with 401, do not attempt to refresh
    if (requestUrl.includes('/users/login')) {
      return Promise.reject(error);
    }

    // If refresh itself failed with 401, session is invalid
    if (requestUrl.includes('/users/refresh')) {
      clearTokens();
      triggerAuthFailure();
      return Promise.reject(error);
    }

    // If another refresh call is currently pending, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((newToken) => {
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return ApiClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const currentRefreshToken = localStorage.getItem('refreshToken');

    if (!currentRefreshToken) {
      isRefreshing = false;
      clearTokens();
      triggerAuthFailure();
      return Promise.reject(error);
    }

    try {
      // Use raw axios to prevent recursive interceptor triggers
      const refreshResponse = await axios.post(
        `${API_GATEWAY}/users/refresh`,
        { refreshToken: currentRefreshToken },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, application/hal+json'
          },
          timeout: 10000
        }
      );

      const resData = refreshResponse.data?.data || refreshResponse.data;
      const newAccessToken = resData?.accessToken;
      const newRefreshToken = resData?.refreshToken || currentRefreshToken;

      if (!newAccessToken) {
        throw new Error('Refresh response missing access token');
      }

      // Store plain tokens directly
      localStorage.setItem('accessToken', newAccessToken);
      if (newRefreshToken) {
        localStorage.setItem('refreshToken', newRefreshToken);
      }

      // Update headers for retrying request
      ApiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      processQueue(null, newAccessToken);
      isRefreshing = false;

      return ApiClient(originalRequest);
    } catch (refreshErr) {
      processQueue(refreshErr, null);
      isRefreshing = false;
      clearTokens();
      triggerAuthFailure();
      return Promise.reject(refreshErr);
    }
  }
);

export default ApiClient;
