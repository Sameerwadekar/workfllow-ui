import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loginUser, loginSuccess, loginFailure, logout } from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Direct dispatch reference from store
export const { dispatch } = store;

// Specialized dispatch helper functions on store
export const dispatchLogin = (credentials) => store.dispatch(loginUser(credentials));
export const dispatchLogout = () => store.dispatch(logout());

export default store;
