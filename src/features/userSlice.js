import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // { userId, name, email, tenant, role: { roleId, roleName }, permissions: [] }
  isAuthenticated: false,
  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload);
      state.loading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { setUser, clearUser, setLoading, setError } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserRole = (state) => {
  const role = state.user.user?.role;
  if (!role) return null;
  if (typeof role === 'string') return role;
  return role.roleName || role.name || null;
};
export const selectUserPermissions = (state) => {
  const user = state.user.user;
  if (!user) return [];
  if (Array.isArray(user.permissions)) return user.permissions;
  if (Array.isArray(user.role?.permissions)) return user.role.permissions;
  return [];
};

export const selectUserPermissionNames = (state) => {
  const user = state.user.user;
  if (!user) return [];
  const perms = Array.isArray(user.permissions)
    ? user.permissions
    : Array.isArray(user.role?.permissions)
    ? user.role.permissions
    : [];
  return perms.map((p) => (typeof p === 'string' ? p : p.name));
};

export const selectHasPermission = (permissionName) => (state) => {
  const permNames = selectUserPermissionNames(state);
  return permNames.includes(permissionName);
};

export function hasPermission(permission, permissionsList = []) {
  if (!permission) return true;
  return permissionsList.includes(permission);
}

export const selectTenant = (state) => state.user.user?.tenant || null;
export const selectUserLoading = (state) => state.user.loading;

export default userSlice.reducer;
