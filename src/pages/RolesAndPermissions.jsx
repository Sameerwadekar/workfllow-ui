import React, { useState } from 'react';
import { FileSpreadsheet, Plus } from 'lucide-react';
import RolesHeader from '../components/roles/RolesHeader';
import RolesStats from '../components/roles/RolesStats';
import RolesTable from '../components/roles/RolesTable';
import AddRoleModal from '../components/roles/AddRoleModal';
import ExportMatrixModal from '../components/roles/ExportMatrixModal';

export default function RolesAndPermissions({ onToggleSidebar }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleSaveRole = (newRole) => {
    alert(`New role "${newRole.name}" (${newRole.slug}) configured successfully.`);
  };

  const handleEditRole = (role) => {
    alert(`Editing permissions for "${role.name}" (${role.slug}).`);
  };

  const handleViewRole = (role) => {
    alert(`Viewing details for "${role.name}". Assigned to ${role.assignedUsers.length} seat buckets.`);
  };

  return (
    <div className="space-y-7">
      {/* 1. Top Header Bar */}
      <RolesHeader
        onToggleSidebar={onToggleSidebar}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 2. Page Title & Action Buttons Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Roles & Permissions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage access control, organizational privileges, and security boundaries across Acme Corp.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Export Matrix Button */}
          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200/90 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-xs sm:text-sm font-semibold shadow-2xs transition cursor-pointer active:scale-98"
          >
            <FileSpreadsheet className="w-4 h-4 text-slate-500" />
            <span>Export Matrix</span>
          </button>

          {/* Add New Role Button */}
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-[#00c875] hover:bg-[#00b368] active:bg-[#009e5c] text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/20 transition cursor-pointer active:scale-98"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Role</span>
          </button>
        </div>
      </div>

      {/* 3. 4 Top Metric / Stats Cards */}
      <section aria-label="Role and Security Metrics">
        <RolesStats />
      </section>

      {/* 4. Roles Table and Filters */}
      <section aria-label="Roles List and Permissions">
        <RolesTable
          searchQuery={searchQuery}
          onEditRole={handleEditRole}
          onViewRole={handleViewRole}
        />
      </section>

      {/* 5. Modals */}
      <AddRoleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveRole}
      />

      <ExportMatrixModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
