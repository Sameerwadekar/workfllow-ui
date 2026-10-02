import React, { useState, useMemo } from 'react';
import {
  Shield,
  Zap,
  Code,
  PenTool,
  Eye,
  FileSpreadsheet,
  Lock,
  Pencil,
  MoreVertical,
  Search,
  X,
  HelpCircle
} from 'lucide-react';
import { ROLES_DATA } from '../../data/rolesData';

export default function RolesTable({
  searchQuery: propSearchQuery = '',
  onSearchChange,
  onEditRole,
  onViewRole,
  onOpenPermissionsCatalog
}) {
  const [internalSearch, setInternalSearch] = useState('');
  const searchQuery = onSearchChange ? propSearchQuery : internalSearch;

  const handleSearchChange = (val) => {
    if (onSearchChange) {
      onSearchChange(val);
    } else {
      setInternalSearch(val);
    }
    setCurrentPage(1);
  };

  const [selectedCategory, setSelectedCategory] = useState('All Roles');
  const [showInactive, setShowInactive] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const { categories, roles } = ROLES_DATA;

  // Filter roles based on category, search query, and showInactive toggle
  const filteredRoles = useMemo(() => {
    return roles.filter((role) => {
      // Inactive filter
      if (!showInactive && role.status === 'Inactive') {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'All Roles' && role.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = role.name.toLowerCase().includes(query);
        const matchesSlug = role.slug.toLowerCase().includes(query);
        const matchesDesc = role.description.toLowerCase().includes(query);
        const matchesPerms = role.keyPermissions.some((p) =>
          p.code.toLowerCase().includes(query)
        );
        return matchesName || matchesSlug || matchesDesc || matchesPerms;
      }
      return true;
    });
  }, [roles, selectedCategory, showInactive, searchQuery]);

  // Paginated slice
  const totalItems = filteredRoles.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedRoles = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRoles.slice(start, start + pageSize);
  }, [filteredRoles, currentPage, pageSize]);

  // Handle page changes
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  // Helper for rendering icons
  const renderRoleIcon = (iconType, bgClass) => {
    switch (iconType) {
      case 'shield':
        return (
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${bgClass}`}>
            <Shield className="w-5 h-5 stroke-[2]" />
          </div>
        );
      case 'zap':
        return (
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${bgClass}`}>
            <Zap className="w-5 h-5 stroke-[2]" />
          </div>
        );
      case 'code':
        return (
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${bgClass}`}>
            <Code className="w-5 h-5 stroke-[2]" />
          </div>
        );
      case 'pen-tool':
        return (
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${bgClass}`}>
            <PenTool className="w-5 h-5 stroke-[2]" />
          </div>
        );
      case 'eye':
        return (
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${bgClass}`}>
            <Eye className="w-5 h-5 stroke-[2]" />
          </div>
        );
      case 'file-spreadsheet':
        return (
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${bgClass}`}>
            <FileSpreadsheet className="w-5 h-5 stroke-[2]" />
          </div>
        );
      case 'lock':
        return (
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${bgClass}`}>
            <Lock className="w-5 h-5 stroke-[2]" />
          </div>
        );
      default:
        return (
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${bgClass}`}>
            <Shield className="w-5 h-5 stroke-[2]" />
          </div>
        );
    }
  };

  // Helper for rendering badge next to role name
  const renderBadge = (badge, type) => {
    switch (type) {
      case 'purple':
        return (
          <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 border border-purple-200/60 px-2 py-0.5 rounded-md leading-normal">
            {badge}
          </span>
        );
      case 'blue':
        return (
          <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-md leading-normal">
            {badge}
          </span>
        );
      case 'amber':
        return (
          <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md leading-normal">
            {badge}
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md leading-normal">
            {badge}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* 1. Search Bar Horizontal Row */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-white">
        <div className="relative w-full max-w-xl">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                handleSearchChange('');
              }
            }}
            placeholder="Search roles, permissions, descriptions..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#006c49]/30 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => handleSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Category Filter Tabs & Status Row */}
      <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100">
        {/* Category Filter Tabs */}
        <div className="bg-slate-100/70 p-1.5 rounded-2xl flex items-center gap-1 overflow-x-auto scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Right Controls: Inactive Checkbox & Counter */}
        <div className="flex items-center gap-4 text-xs sm:text-sm font-medium shrink-0">
          <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showInactive}
              onChange={(e) => {
                setShowInactive(e.target.checked);
                setCurrentPage(1);
              }}
              className="w-4 h-4 rounded border-slate-300 text-[#006c49] focus:ring-[#006c49] accent-[#006c49] cursor-pointer"
            />
            <span>Show Inactive Roles</span>
          </label>

          <span className="text-slate-400 font-normal">
            Showing {filteredRoles.length} of {roles.length} Roles
          </span>
        </div>
      </div>

      {/* Main Table Responsive Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 tracking-wider uppercase">
              <th scope="col" className="py-4 px-6 font-bold">
                ROLE & SLUG
              </th>
              <th scope="col" className="py-4 px-6 font-bold">
                ROLE DESCRIPTION
              </th>
              <th scope="col" className="py-4 px-6 font-bold">
                ASSIGNED USERS
              </th>
              <th scope="col" className="py-4 px-6 font-bold">
                <div className="flex items-center gap-1.5">
                  <span>KEY PERMISSIONS</span>
                  {onOpenPermissionsCatalog && (
                    <button
                      type="button"
                      onClick={onOpenPermissionsCatalog}
                      className="text-slate-400 hover:text-[#006c49] transition cursor-pointer p-0.5"
                      title="View all system permissions & descriptions"
                      aria-label="View all system permissions & descriptions"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </th>
              <th scope="col" className="py-4 px-6 font-bold">
                STATUS
              </th>
              <th scope="col" className="py-4 px-6 text-right font-bold">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {paginatedRoles.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-slate-400">
                  No roles match the selected criteria.
                </td>
              </tr>
            ) : (
              paginatedRoles.map((role) => (
                <tr
                  key={role.id}
                  className="hover:bg-slate-50/60 transition-colors group"
                >
                  {/* 1. ROLE & SLUG */}
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3.5">
                      {renderRoleIcon(role.iconType, role.iconBg)}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">
                            {role.name}
                          </span>
                          {renderBadge(role.badge, role.badgeType)}
                        </div>
                        <div className="text-xs font-mono text-slate-400 mt-1">
                          {role.slug}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 2. ROLE DESCRIPTION */}
                  <td className="py-5 px-6 max-w-xs">
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {role.description}
                    </p>
                  </td>

                  {/* 3. ASSIGNED USERS (Avatar Stack) */}
                  <td className="py-5 px-6">
                    <div className="flex items-center -space-x-1.5 overflow-hidden">
                      {role.assignedUsers.map((u, idx) => {
                        if (u.overflow) {
                          return (
                            <span
                              key={idx}
                              className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold ring-2 ring-white"
                            >
                              {u.overflow}
                            </span>
                          );
                        }
                        return (
                          <div
                            key={idx}
                            title={u.name}
                            className={`w-7 h-7 rounded-full ${u.color} flex items-center justify-center text-[10px] font-bold ring-2 ring-white shadow-2xs`}
                          >
                            {u.initials}
                          </div>
                        );
                      })}
                    </div>
                  </td>

                  {/* 4. KEY PERMISSIONS */}
                  <td className="py-5 px-6">
                    <div className="flex flex-wrap items-center gap-1.5 max-w-xs">
                      {role.keyPermissions.map((perm, idx) => {
                        if (perm.type === 'highlight') {
                          return (
                            <span
                              key={idx}
                              className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/70"
                            >
                              {perm.code}
                            </span>
                          );
                        }
                        if (perm.type === 'danger') {
                          return (
                            <span
                              key={idx}
                              className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200/70"
                            >
                              {perm.code}
                            </span>
                          );
                        }
                        return (
                          <span
                            key={idx}
                            className="font-mono text-xs text-slate-600 px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/60"
                          >
                            {perm.code}
                          </span>
                        );
                      })}
                    </div>
                  </td>

                  {/* 5. STATUS */}
                  <td className="py-5 px-6">
                    {role.status === 'Active' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00c875]" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* 6. ACTIONS */}
                  <td className="py-5 px-6 text-right relative">
                    <div className="inline-flex items-center justify-end gap-2">
                      <button
                        type="button"
                        aria-label={`Edit ${role.name}`}
                        onClick={() => onEditRole && onEditRole(role)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          aria-label={`More options for ${role.name}`}
                          onClick={() =>
                            setActiveMenuId(activeMenuId === role.id ? null : role.id)
                          }
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {/* Dropdown Menu */}
                        {activeMenuId === role.id && (
                          <div
                            onMouseLeave={() => setActiveMenuId(null)}
                            className="absolute right-0 mt-1 w-44 rounded-xl bg-white shadow-lg border border-slate-100 py-1.5 z-20 text-left text-xs"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                if (onViewRole) onViewRole(role);
                              }}
                              className="w-full px-3.5 py-2 text-slate-700 hover:bg-slate-50 font-medium flex items-center gap-2 cursor-pointer"
                            >
                              <span>View Details</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                alert(`Duplicated ${role.name} template.`);
                              }}
                              className="w-full px-3.5 py-2 text-slate-700 hover:bg-slate-50 font-medium flex items-center gap-2 cursor-pointer"
                            >
                              <span>Duplicate Role</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                alert(`Security audit generated for ${role.slug}.`);
                              }}
                              className="w-full px-3.5 py-2 text-slate-700 hover:bg-slate-50 font-medium flex items-center gap-2 cursor-pointer"
                            >
                              <span>Audit History</span>
                            </button>
                            <div className="my-1 border-t border-slate-100" />
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                alert(`Role ${role.name} cannot be deleted while active seats are bound.`);
                              }}
                              className="w-full px-3.5 py-2 text-rose-600 hover:bg-rose-50 font-medium flex items-center gap-2 cursor-pointer"
                            >
                              <span>Deactivate Role</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer: Pagination */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100 text-xs">
        <span className="text-slate-500 font-medium">
          Displaying {paginatedRoles.length} of {roles.filter((r) => showInactive || r.status === 'Active').length} active roles
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
