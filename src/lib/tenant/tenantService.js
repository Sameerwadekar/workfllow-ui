import ApiClient from '../ApiClient.js';
import { API_GATEWAY } from '../constant.js';

export const getTenants = (params) => {
  return ApiClient.get(`${API_GATEWAY}/tenants`, { params });
};

export const getTenantById = (id) => {
  return ApiClient.get(`${API_GATEWAY}/tenants/${id}`);
};

export const createTenant = (data) => {
  return ApiClient.post(`${API_GATEWAY}/tenants`, data);
};

export const updateTenant = (id, data) => {
  return ApiClient.put(`${API_GATEWAY}/tenants/${id}`, data);
};

export const deleteTenant = (id) => {
  return ApiClient.delete(`${API_GATEWAY}/tenants/${id}`);
};

export const resetTenantPassword = (id, newPassword) => {
  return ApiClient.post(`${API_GATEWAY}/tenants/${id}/reset-password`, { newPassword });
};
