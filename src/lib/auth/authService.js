import createApiClient from '../ApiClient';
import { API_GATEWAY, AUTH_ENDPOINTS, STORAGE_KEYS } from '../constant';

const apiClient = createApiClient(API_GATEWAY);

export const authService = {
  /**
   * Login user with email and password
   * @param {Object} credentials
   * @param {string} credentials.email
   * @param {string} credentials.password
   * @returns {Promise<Object>} Backend response { success, message, data, timestamp }
   */
  async login(credentials) {
    try {
      const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, {
        email: credentials.email,
        password: credentials.password,
      });

      const result = response.data;

      if (result?.success && result?.data) {
        try {
          localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(result.data));
        } catch (storageError) {
          console.error('Error saving user info to localStorage:', storageError);
        }
      }

      return result;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Login failed';
      throw new Error(message);
    }
  },

  /**
   * Logout user and clear local storage
   */
  async logout() {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER_INFO);
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (storageError) {
      console.error('Error clearing localStorage:', storageError);
    }
  },

  /**
   * Retrieve currently saved user from localStorage
   */
  getCurrentUser() {
    try {
      const user = localStorage.getItem(STORAGE_KEYS.USER_INFO);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },
};

export default authService;
