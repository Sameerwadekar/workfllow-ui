import ApiClient from '../ApiClient.js';
import { API_GATEWAY } from '../constant.js';

export const getDepartments = (params) => {
  return ApiClient.get(`${API_GATEWAY}/departments`, { params });
};

export const getDepartmentById = (id) => {
  return ApiClient.get(`${API_GATEWAY}/departments/${id}`);
};

export const createDepartment = (data) => {
  return ApiClient.post(`${API_GATEWAY}/departments`, data);
};

export const updateDepartment = (id, data) => {
  return ApiClient.put(`${API_GATEWAY}/departments/${id}`, data);
};

export const deleteDepartment = (id) => {
  return ApiClient.delete(`${API_GATEWAY}/departments/${id}`);
};
