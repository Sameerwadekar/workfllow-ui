import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../lib/auth/authService';
import { STORAGE_KEYS } from '../../lib/constant';

// Safely initialize state from localStorage
const getStoredUser = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_INFO);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const initialUser = getStoredUser();

const initialState = {
  user: initialUser,
  isAuthenticated: Boolean(initialUser),
  isLoading: false,
  error: null,
  successMessage: null,
};

/**
 * Async Thunk to handle user login process
 * Expected payload: { email, password }
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authService.login({ email, password });
      if (response && response.success === false) {
        return rejectWithValue(response.message || 'Login failed');
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload?.data || action.payload;
      state.successMessage = action.payload?.message || 'Login successful';
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload || 'Login failed';
      state.successMessage = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      state.successMessage = null;
      authService.logout();
    },
    clearError: (state) => {
      state.error = null;
    },
    resetAuthState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload?.data || action.payload;
        state.successMessage = action.payload?.message || 'Login successful';
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload || 'Login failed';
        state.successMessage = null;
      });
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  resetAuthState,
} = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthSuccessMessage = (state) => state.auth.successMessage;

export default authSlice.reducer;
