import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Menu, ShieldCheck, CheckCircle2, X } from 'lucide-react';
import RolesTable from '../components/roles/RolesTable';
import AddRoleModal from '../components/roles/AddRoleModal';
import PermissionsCatalogModal from '../components/roles/PermissionsCatalogModal';
import { ROLES_DATA } from '../data/rolesData';
import { getRoleStats, createRole } from '../lib/role/roleService';

export default function RolesAndPermissions({ onToggleSidebar: propToggleSidebar }) {
  let outletCtx = null;
  try {
    outletCtx = useOutletContext();
  } catch {
    outletCtx = null;
  }
  const onToggleSidebar = propToggleSidebar || outletCtx?.onToggleSidebar;

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [stats, setStats] = useState({
    activeRoles: ROLES_DATA.workspace?.activeRolesCount || 8,
    totalUsers: ROLES_DATA.workspace?.totalUsersCount || 142
  });

  const refreshStats = () => {
    getRoleStats()
      .then((res) => {
        if (res?.data?.data) {
          const d = res.data.data;
          setStats({
            activeRoles: d.activeRoles ?? d.totalRoles ?? 8,
            totalUsers: d.totalUsers ?? 142
          });
        }
      })
      .catch(() => {
        // Fallback to default stats
      });
  };

  useEffect(() => {
    refreshStats();
  }, []);

  const handleSaveRole = async (newRole) => {
    try {
      const payload = {
        roleName: newRole.roleName,
        description: newRole.description,
        departmentId: newRole.departmentId,
        status: newRole.status || 'ACTIVE',
        permissionIds: newRole.permissionIds
      };
      await createRole(payload);
      setSuccessMessage(`Role "${newRole.name}" created successfully.`);
      setTimeout(() => setSuccessMessage(null), 5000);
      refreshStats();
    } catch (err) {
      console.error('Failed to create role:', err);
      const msg = err?.response?.data?.message || err?.message || 'Failed to create role.';
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(null), 6000);
    }
  };

  const handleEditRole = (role) => {
    alert(`Editing permissions for "${role.name}" (${role.slug}).`);
  };

  const handleViewRole = (role) => {
    alert(`Viewing details for "${role.name}". Assigned to ${role.assignedUsers?.length || 0} seat buckets.`);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar - matching Departments layout */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Roles & Permissions
            </h1>
            {/* Active Roles & Total Users Status Badge */}
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200/80 bg-white shadow-2xs text-xs font-semibold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-[#00c875] animate-pulse" />
              <span>{stats.activeRoles} Roles Active</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500 font-medium">{stats.totalUsers} Users</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage access control, organizational privileges, and security boundaries.
          </p>
          {/* Mobile Badge */}
          <div className="sm:hidden mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200/80 bg-white shadow-2xs text-xs font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-[#00c875] animate-pulse" />
            <span>{stats.activeRoles} Roles Active</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-medium">{stats.totalUsers} Users</span>
          </div>
        </div>

        {/* Action Buttons Up */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition cursor-pointer"
              title="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* Permissions Catalog Button */}
          <button
            type="button"
            onClick={() => setIsCatalogOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold shadow-2xs transition cursor-pointer"
            title="Browse all granular permissions, descriptions, and functional modules"
          >
            <ShieldCheck className="w-4 h-4 text-[#006c49]" />
            <span>Permissions Catalog</span>
          </button>

          {/* Add Role Button */}
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006c49] hover:bg-[#005236] text-white text-xs sm:text-sm font-semibold shadow-md shadow-emerald-700/20 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Role</span>
          </button>
        </div>
      </div>

      {/* Alert Notices */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center justify-between animate-in fade-in duration-150">
          <span>{errorMessage}</span>
          <button type="button" onClick={() => setErrorMessage(null)} className="cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center justify-between animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
          <button type="button" onClick={() => setSuccessMessage(null)} className="cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Roles Table (with Search and Filters Flipped Down) */}
      <section aria-label="Roles List and Permissions">
        <RolesTable
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onEditRole={handleEditRole}
          onViewRole={handleViewRole}
          onOpenPermissionsCatalog={() => setIsCatalogOpen(true)}
        />
      </section>

      {/* Modals */}
      <AddRoleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveRole}
      />

      <PermissionsCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
      />
    </div>
  );
}
