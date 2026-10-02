import axios from 'axios';
import { API_GATEWAY } from './constant.js';
import { isTokenExpired } from './auth/tokenUtils.js';

// Registered callbacks for when authentication completely fails (e.g. token expired and refresh failed)
let authFailureListeners = [];

export const onAuthFailure = (callback) => {
  authFailureListeners.push(callback);
  return () => {
    authFailureListeners = authFailureListeners.filter((cb) => cb !== callback);
  };
};

export const triggerAuthFailure = () => {
  authFailureListeners.forEach((cb) => {
    try {
      cb();
    } catch (err) {
      console.error('Error executing auth failure listener:', err);
    }
  });
};

export const clearTokens = () => {
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

// Singleton in-flight refresh promise (Synchronized Mutex)
let refreshPromise = null;

/**
 * Returns a valid access token.
 * If the current access token is expired or expiring within 60s buffer,
 * silently refreshes using the refresh token.
 * Multiple concurrent callers share the exact same refresh promise (Mutex).
 */
export const getFreshAccessToken = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  // 1. If accessToken exists and is still valid (not expired within 60s buffer), use it
  if (accessToken && !isTokenExpired(accessToken, 60)) {
    return accessToken;
  }

  // 2. If no refreshToken is available, session is completely unauthenticated
  if (!refreshToken) {
    clearTokens();
    triggerAuthFailure();
    throw new Error('No refresh token available');
  }

  // 3. Mutex: If a refresh operation is already in flight, return the existing promise
  if (refreshPromise) {
    return refreshPromise;
  }

  // 4. Create synchronized refresh promise
  refreshPromise = (async () => {
    try {
      const response = await axios.post(
        `${API_GATEWAY}/users/refresh`,
        { refreshToken },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, application/hal+json'
          },
          timeout: 10000
        }
      );

      const resData = response.data?.data || response.data;
      const newAccessToken = resData?.accessToken;
      const newRefreshToken = resData?.refreshToken || refreshToken;

      if (!newAccessToken) {
        throw new Error('Refresh response missing access token');
      }

      localStorage.setItem('accessToken', newAccessToken);
      if (newRefreshToken) {
        localStorage.setItem('refreshToken', newRefreshToken);
      }

      ApiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
      return newAccessToken;
    } catch (err) {
      clearTokens();
      triggerAuthFailure();
      throw err;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

const isPublicEndpoint = (url = '') => {
  return (
    url.includes('/users/login') ||
    url.includes('/users/refresh') ||
    url.includes('/users/register') ||
    url.includes('/health')
  );
};

// Request Interceptor: Proactively ensure valid JWT Bearer token before sending
ApiClient.interceptors.request.use(
  async (config) => {
    const url = config.url || '';
    if (isPublicEndpoint(url)) {
      return config;
    }

    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');

    if (refreshToken || accessToken) {
      try {
        const validToken = await getFreshAccessToken();
        if (validToken) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${validToken}`;
        }
      } catch (err) {
        // If refresh fails, let request proceed so response interceptor or caller handles standard error
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Reactive fallback for unexpected 401s (e.g. server revocation or clock drift)
ApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthError =
      error.response &&
      (error.response.status === 401 ||
        (error.response.status === 404 &&
          error.response.data?.message === 'User is not authenticated'));

    if (!isAuthError || !originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    const requestUrl = originalRequest.url || '';
    if (isPublicEndpoint(requestUrl)) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Force fresh token (will share in-flight promise if another request already triggered it)
      const newAccessToken = await getFreshAccessToken();
      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return ApiClient(originalRequest);
    } catch (refreshErr) {
      return Promise.reject(refreshErr);
    }
  }
);

export default ApiClient;
