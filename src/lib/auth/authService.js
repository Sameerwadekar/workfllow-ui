import ApiClient from '../ApiClient.js';
import axios from 'axios';
import { API_GATEWAY } from '../constant.js';

export const Login = (email, password) => {
  const data = { email, password };
  return ApiClient.post(`${API_GATEWAY}/users/login`, data);
};

export const refreshAuthToken = (refreshToken) => {
  return axios.post(`${API_GATEWAY}/users/refresh`, { refreshToken });
};

export const getMe = () => {
  return ApiClient.get(`${API_GATEWAY}/users/me`);
};

export const logout = async () => {
  try {
    await ApiClient.post(`${API_GATEWAY}/users/logout`).catch(() => {});
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};
