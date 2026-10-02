import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  ShieldCheck,
  Search,
  RefreshCw,
  Layers,
  FileCode,
  Tag,
  AlertCircle
} from 'lucide-react';
import { getGroupedPermissions } from '../../lib/role/roleService';

export default function PermissionsCatalogModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [groupedPermissions, setGroupedPermissions] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState('ALL');

  // Fetch permissions when modal opens
  const fetchPermissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getGroupedPermissions();
      const data = response?.data?.data || response?.data || {};
      if (typeof data === 'object' && data !== null) {
        setGroupedPermissions(data);
      } else {
        setGroupedPermissions({});
      }
    } catch (err) {
      console.error('Failed to load permissions:', err);
      setError(
        err?.response?.data?.message ||
          'Failed to load system permissions. Please ensure the authorization service is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchPermissions();
    } else {
      setSearchQuery('');
      setSelectedModule('ALL');
      setError(null);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Extract all module names dynamically from API keys
  const availableModules = useMemo(() => {
    return Object.keys(groupedPermissions || {});
  }, [groupedPermissions]);

  // Total permissions count
  const totalCount = useMemo(() => {
    return Object.values(groupedPermissions || {}).reduce((acc, list) => {
      return acc + (Array.isArray(list) ? list.length : 0);
    }, 0);
  }, [groupedPermissions]);

  // Filter permissions dynamically based on module selection and search query
  const filteredGrouped = useMemo(() => {
    if (!groupedPermissions) return {};
    const query = searchQuery.trim().toLowerCase();
    const result = {};

    Object.entries(groupedPermissions).forEach(([moduleName, permsList]) => {
      if (selectedModule !== 'ALL' && selectedModule.toLowerCase() !== moduleName.toLowerCase()) {
        return;
      }

      if (!Array.isArray(permsList)) return;

      const matchedPerms = permsList.filter((p) => {
        if (!query) return true;
        const matchesName = (p.name || '').toLowerCase().includes(query);
        const matchesDesc = (p.description || '').toLowerCase().includes(query);
        const matchesAction = (p.action || '').toLowerCase().includes(query);
        const matchesResource = (p.resource || '').toLowerCase().includes(query);
        const matchesModule = moduleName.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesAction || matchesResource || matchesModule;
      });

      if (matchedPerms.length > 0) {
        result[moduleName] = matchedPerms;
      }
    });

    return result;
  }, [groupedPermissions, searchQuery, selectedModule]);

  // Count total filtered permissions
  const filteredCount = useMemo(() => {
    return Object.values(filteredGrouped).reduce((acc, list) => acc + list.length, 0);
  }, [filteredGrouped]);

  if (!isOpen) return null;

  // Helper to format module heading (e.g. "project" -> "Project Scope")
  const formatModuleTitle = (mod) => {
    if (!mod) return 'General';
    return mod.charAt(0).toUpperCase() + mod.slice(1);
  };

  // Helper to color action badges
  const getActionBadgeColor = (action) => {
    const act = (action || '').toLowerCase();
    if (act.includes('view') || act.includes('read')) {
      return 'bg-blue-50 text-blue-700 border-blue-200/60';
    }
    if (act.includes('create') || act.includes('add')) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
    }
    if (act.includes('edit') || act.includes('update')) {
      return 'bg-amber-50 text-amber-700 border-amber-200/60';
    }
    if (act.includes('delete') || act.includes('remove') || act.includes('reset')) {
      return 'bg-rose-50 text-rose-700 border-rose-200/60';
    }
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="permissions-catalog-title"
    >
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#006c49] border border-emerald-100/80 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 id="permissions-catalog-title" className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  Permissions Directory
                </h2>
                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#006c49] border border-emerald-200/60">
                  {totalCount} Permissions
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Dynamic capability registry and functional descriptions fetched from the system API.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchPermissions}
              disabled={loading}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer disabled:opacity-50"
              title="Refresh permissions list"
              aria-label="Refresh permissions list"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              title="Close modal"
              aria-label="Close permissions dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="px-6 py-3.5 border-b border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by code, module, action, or description..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#006c49]/30 transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Module Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            <button
              type="button"
              onClick={() => setSelectedModule('ALL')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedModule === 'ALL'
                  ? 'bg-[#006c49] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              All Scopes ({totalCount})
            </button>
            {availableModules.map((mod) => {
              const count = Array.isArray(groupedPermissions[mod]) ? groupedPermissions[mod].length : 0;
              const isSelected = selectedModule.toLowerCase() === mod.toLowerCase();
              return (
                <button
                  key={mod}
                  type="button"
                  onClick={() => setSelectedModule(mod)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer capitalize ${
                    isSelected
                      ? 'bg-[#006c49] text-white shadow-xs font-semibold'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {mod} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Body: Permissions List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 text-slate-500 space-y-3">
              <RefreshCw className="w-7 h-7 animate-spin text-[#006c49]" />
              <p className="text-sm font-medium">Fetching dynamic permissions from registry...</p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" />
              <div className="flex-1 text-xs">
                <span className="font-semibold block text-sm">Failed to load permissions</span>
                <p className="mt-0.5">{error}</p>
                <button
                  type="button"
                  onClick={fetchPermissions}
                  className="mt-2.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-700 transition cursor-pointer"
                >
                  Retry Connection
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && Object.keys(filteredGrouped).length === 0 && (
            <div className="text-center py-16 px-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
                <FileCode className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">No permissions found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                {searchQuery
                  ? `No permissions match your filter "${searchQuery}". Try a different keyword.`
                  : 'No permissions have been registered in the system yet.'}
              </p>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-3 text-xs font-semibold text-[#006c49] hover:underline cursor-pointer"
                >
                  Clear search filter
                </button>
              )}
            </div>
          )}

          {/* Dynamic Module Groupings */}
          {!loading &&
            !error &&
            Object.entries(filteredGrouped).map(([moduleName, permissions]) => (
              <section
                key={moduleName}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden"
              >
                {/* Module Heading */}
                <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-[#006c49]" />
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                      {formatModuleTitle(moduleName)}
                    </h3>
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    {permissions.length} {permissions.length === 1 ? 'Capability' : 'Capabilities'}
                  </span>
                </div>

                {/* Permissions Grid / List */}
                <div className="divide-y divide-slate-100">
                  {permissions.map((perm) => (
                    <div
                      key={perm.id || perm.name}
                      className="p-4 sm:p-4.5 hover:bg-slate-50/60 transition flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        {/* Permission Identifier and Badges */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <code className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50/80 border border-emerald-200/60 px-2 py-0.5 rounded-md">
                            {perm.name}
                          </code>

                          {perm.action && (
                            <span
                              className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getActionBadgeColor(
                                perm.action
                              )}`}
                            >
                              {perm.action}
                            </span>
                          )}

                          {perm.resource && (
                            <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <Tag className="w-2.5 h-2.5 text-slate-400" />
                              {perm.resource}
                            </span>
                          )}
                        </div>

                        {/* Functional Description */}
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                          {perm.description || (
                            <span className="text-slate-400 italic">No description assigned.</span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800 font-semibold">{filteredCount}</strong> of{' '}
            <strong className="text-slate-800 font-semibold">{totalCount}</strong> system permissions
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition cursor-pointer"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
}
