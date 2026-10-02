import ApiClient from '../ApiClient.js';
import { API_GATEWAY } from '../constant.js';

export const getRoles = (params) => {
  return ApiClient.get(`${API_GATEWAY}/roles`, { params });
};

export const getRoleStats = () => {
  return ApiClient.get(`${API_GATEWAY}/roles/stats`);
};

export const getRoleById = (id) => {
  return ApiClient.get(`${API_GATEWAY}/roles/${id}`);
};

export const createRole = (data) => {
  return ApiClient.post(`${API_GATEWAY}/roles`, data);
};

export const updateRole = (id, data) => {
  return ApiClient.put(`${API_GATEWAY}/roles/${id}`, data);
};

export const deleteRole = (id) => {
  return ApiClient.delete(`${API_GATEWAY}/roles/${id}`);
};

export const getGroupedPermissions = () => {
  return ApiClient.get(`${API_GATEWAY}/permissions/`);
};

export const getAllPermissions = () => {
  return ApiClient.get(`${API_GATEWAY}/permissions/list`);
};

