import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setUser,
  clearUser,
  setLoading,
  selectUser,
  selectUserPermissionNames
} from './features/userSlice';
import { getMe } from './lib/auth/authService';
import { onAuthFailure, getFreshAccessToken, clearTokens } from './lib/ApiClient';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TenantsManagement from './pages/TenantsManagement';
import DepartmentsManagement from './pages/DepartmentsManagement';
import RolesAndPermissions from './pages/RolesAndPermissions';
import OrganizationSettings from './pages/OrganizationSettings';
import PlaceholderPage from './pages/PlaceholderPage';
import AccessDenied from './pages/AccessDenied';
import DashboardLayout from './layouts/DashboardLayout';
import { SessionRestoringLoader } from './components/ui/loaders';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector(selectUser);
  const userPermissions = useSelector(selectUserPermissionNames);
  const [isInitializing, setIsInitializing] = useState(true);

  // Subscribe to auth failure events (e.g. token refresh failure or session expiry)
  useEffect(() => {
    const unsubscribe = onAuthFailure(() => {
      dispatch(clearUser());
      clearTokens();
      navigate('/login', { replace: true });
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  // Check auth session on page load / hard reload
  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      // If neither token is present, user is an unauthenticated guest
      if (!accessToken && !refreshToken) {
        dispatch(clearUser());
        setIsInitializing(false);
        return;
      }

      dispatch(setLoading(true));
      try {
        // Proactively ensure access token is fresh before calling /users/me
        await getFreshAccessToken();

        const response = await getMe();
        const profileData = response?.data?.data || response?.data;

        if (profileData) {
          dispatch(setUser(profileData));
        } else {
          dispatch(clearUser());
          clearTokens();
        }
      } catch (err) {
        console.warn('Session restoration failed:', err?.message || err);
        dispatch(clearUser());
        clearTokens();
      } finally {
        dispatch(setLoading(false));
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, [dispatch]);

  const handleLoginSuccess = (userData) => {
    if (userData) {
      dispatch(setUser(userData));
    }
    const rawPerms = userData?.permissions || [];
    const perms = Array.isArray(rawPerms)
      ? rawPerms.map((p) => (typeof p === 'string' ? p : p.name))
      : [];

    if (perms.includes('dashboard.view')) {
      navigate('/dashboard', { replace: true });
    } else if (perms.includes('tenant.view')) {
      navigate('/tenants', { replace: true });
    } else {
      navigate('/dashboard', { replace: true });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(clearUser());
    navigate('/login', { replace: true });
  };

  // Full-page loader during initial reload/session restoration
  if (isInitializing) {
    return <SessionRestoringLoader />;
  }

  const isAuthenticated = Boolean(currentUser);

  // Default redirect path based on user permissions
  const getDefaultRedirectPath = () => {
    if (userPermissions.includes('dashboard.view')) return '/dashboard';
    if (userPermissions.includes('tenant.view')) return '/tenants';
    return '/dashboard';
  };

  return (
    <Routes>
      {/* Public Login Route */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to={getDefaultRedirectPath()} replace />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )
        }
      />

      {/* Authenticated Application Layout */}
      <Route
        element={
          isAuthenticated ? (
            <DashboardLayout onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace state={{ from: location }} />
          )
        }
      >
        {/* Root path '/' redirects to authorized home */}
        <Route
          path="/"
          element={<Navigate to={getDefaultRedirectPath()} replace />}
        />

        {/* /dashboard and /overview */}
        <Route
          path="/dashboard"
          element={
            userPermissions.includes('dashboard.view') ? (
              <Dashboard onLogout={handleLogout} />
            ) : userPermissions.includes('tenant.view') ? (
              <Navigate to="/tenants" replace />
            ) : (
              <Dashboard onLogout={handleLogout} />
            )
          }
        />
        <Route
          path="/overview"
          element={<Navigate to="/dashboard" replace />}
        />

        {/* Multi-Tenant Organization Management */}
        <Route
          path="/tenants"
          element={
            userPermissions.includes('tenant.view') ? (
              <TenantsManagement />
            ) : (
              <AccessDenied
                requiredPermission="tenant.view"
                targetResource="Tenant Organizations (/tenants)"
                requiredRole="Super Administrator (Platform Scope)"
              />
            )
          }
        />
        <Route
          path="/tenants/create"
          element={
            userPermissions.includes('tenant.create') ? (
              <TenantsManagement openCreateModal={true} />
            ) : (
              <AccessDenied
                requiredPermission="tenant.create"
                targetResource="Tenant Provisioning (/tenants/create)"
                requiredRole="Super Administrator (Platform Scope)"
              />
            )
          }
        />
        <Route
          path="/tenants/edit/:id"
          element={
            userPermissions.includes('tenant.update') ? (
              <TenantsManagement openEditModal={true} />
            ) : (
              <AccessDenied
                requiredPermission="tenant.update"
                targetResource="Tenant Edit"
                requiredRole="Super Administrator (Platform Scope)"
              />
            )
          }
        />

        {/* Departments Management */}
        <Route
          path="/departments"
          element={
            userPermissions.includes('department.view') ? (
              <DepartmentsManagement />
            ) : (
              <AccessDenied
                requiredPermission="department.view"
                targetResource="Departments Management (/departments)"
                requiredRole="Company Administrator"
              />
            )
          }
        />
        <Route
          path="/departments/create"
          element={
            userPermissions.includes('department.create') ? (
              <DepartmentsManagement openCreateModal={true} />
            ) : (
              <AccessDenied
                requiredPermission="department.create"
                targetResource="Department Creation (/departments/create)"
                requiredRole="Company Administrator"
              />
            )
          }
        />
        <Route
          path="/departments/edit/:id"
          element={
            userPermissions.includes('department.update') ? (
              <DepartmentsManagement openEditModal={true} />
            ) : (
              <AccessDenied
                requiredPermission="department.update"
                targetResource="Department Edit"
                requiredRole="Company Administrator"
              />
            )
          }
        />

        {/* Dedicated Access Denied (403) Routes */}
        <Route
          path="/access-denied"
          element={<AccessDenied />}
        />
        <Route
          path="/403"
          element={<AccessDenied />}
        />

        {/* Roles & Permissions Management */}
        <Route
          path="/roles-access"
          element={<RolesAndPermissions />}
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={<OrganizationSettings />}
        />

        {/* Placeholder Workspace Routes */}
        <Route
          path="/projects"
          element={
            <PlaceholderPage
              title="Projects"
              description="Coordinate initiatives, track cross-team dependencies, and manage milestones."
              badge="28"
            />
          }
        />
        <Route
          path="/projects/*"
          element={
            <PlaceholderPage
              title="Projects"
              description="Coordinate initiatives, track cross-team dependencies, and manage milestones."
            />
          }
        />

        <Route
          path="/tasks"
          element={
            <PlaceholderPage
              title="Tasks"
              description="Sprint backlogs, individual assignments, and workflow statuses."
              badge="18"
            />
          }
        />
        <Route
          path="/tasks/*"
          element={
            <PlaceholderPage
              title="Tasks"
              description="Sprint backlogs, individual assignments, and workflow statuses."
            />
          }
        />

        <Route
          path="/calendar"
          element={
            <PlaceholderPage
              title="Calendar"
              description="Sprint timelines, release dates, and scheduled deliverables."
            />
          }
        />

        <Route
          path="/analytics"
          element={
            <PlaceholderPage
              title="Analytics"
              description="Productivity velocity, burndown metrics, and operational reports."
            />
          }
        />

        <Route
          path="/reports"
          element={
            <PlaceholderPage
              title="Reports"
              description="Automated weekly summaries, KPI exports, and audit logs."
            />
          }
        />

        <Route
          path="/help"
          element={
            <PlaceholderPage
              title="Help & Support"
              description="Guides, keyboard shortcuts, and direct technical support channels."
            />
          }
        />

        {/* Catch-all route */}
        <Route
          path="*"
          element={<Navigate to={getDefaultRedirectPath()} replace />}
        />
      </Route>
    </Routes>
  );
}

export default App;
