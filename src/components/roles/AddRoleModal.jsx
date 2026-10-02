import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  X,
  Shield,
  Check,
  Minus,
  Search,
  ChevronDown,
  ChevronRight,
  Building2,
  Layers,
  Sparkles,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { getGroupedPermissions } from '../../lib/role/roleService';
import { getDepartments } from '../../lib/department/departmentService';

export default function AddRoleModal({ isOpen, onClose, onSave }) {
  const [roleName, setRoleName] = useState('');
  const [description, setDescription] = useState('');

  // Department State
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null); // null means workspace-wide / global
  const [deptSearch, setDeptSearch] = useState('');
  const [deptDropdownOpen, setDeptDropdownOpen] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const deptDropdownRef = useRef(null);

  // Permissions State
  const [groupedPermissions, setGroupedPermissions] = useState({});
  const [selectedPermissionIds, setSelectedPermissionIds] = useState([]); // array of permission IDs (numbers or strings)
  const [permissionSearch, setPermissionSearch] = useState('');
  const [collapsedModules, setCollapsedModules] = useState({});
  const [loadingPermissions, setLoadingPermissions] = useState(false);
  const [formError, setFormError] = useState(null);

  // Close department dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (deptDropdownRef.current && !deptDropdownRef.current.contains(e.target)) {
        setDeptDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch departments and permissions when modal opens
  useEffect(() => {
    if (!isOpen) return;

    // Reset fields
    setRoleName('');
    setDescription('');
    setSelectedDepartment(null);
    setDeptSearch('');
    setDeptDropdownOpen(false);
    setPermissionSearch('');
    setFormError(null);

    let isMounted = true;

    // 1. Fetch departments
    setLoadingDepartments(true);
    getDepartments({ size: 100 })
      .then((res) => {
        if (!isMounted) return;
        const list = res?.data?.data || res?.data || [];
        setDepartments(Array.isArray(list) ? list : []);
      })
      .catch((err) => {
        console.warn('Could not load departments:', err);
      })
      .finally(() => {
        if (isMounted) setLoadingDepartments(false);
      });

    // 2. Fetch grouped permissions
    setLoadingPermissions(true);
    getGroupedPermissions()
      .then((res) => {
        if (!isMounted) return;
        const data = res?.data?.data || res?.data || {};
        if (typeof data === 'object' && data !== null) {
          setGroupedPermissions(data);
          // Default selection: select view permissions for project & task if available
          const initialIds = [];
          Object.values(data).forEach((perms) => {
            if (Array.isArray(perms)) {
              perms.forEach((p) => {
                if (p.name === 'project.view' || p.name === 'task.view') {
                  initialIds.push(p.id ?? p.name);
                }
              });
            }
          });
          setSelectedPermissionIds(initialIds);
        }
      })
      .catch((err) => {
        console.warn('Could not load grouped permissions:', err);
      })
      .finally(() => {
        if (isMounted) setLoadingPermissions(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);


  // Filtered departments based on search query
  const filteredDepartments = useMemo(() => {
    if (!deptSearch.trim()) return departments;
    const q = deptSearch.toLowerCase().trim();
    return departments.filter(
      (d) =>
        (d.name || '').toLowerCase().includes(q) ||
        (d.code || '').toLowerCase().includes(q)
    );
  }, [departments, deptSearch]);

  // Flattened all permissions array
  const allPermissionsList = useMemo(() => {
    return Object.values(groupedPermissions || {}).flat();
  }, [groupedPermissions]);

  // Filtered grouped permissions based on permission search
  const filteredGroupedPermissions = useMemo(() => {
    if (!permissionSearch.trim()) return groupedPermissions;
    const q = permissionSearch.toLowerCase().trim();
    const result = {};

    Object.entries(groupedPermissions).forEach(([moduleName, perms]) => {
      if (!Array.isArray(perms)) return;
      const matches = perms.filter(
        (p) =>
          (p.name || '').toLowerCase().includes(q) ||
          (p.description || '').toLowerCase().includes(q) ||
          (p.action || '').toLowerCase().includes(q) ||
          moduleName.toLowerCase().includes(q)
      );
      if (matches.length > 0) {
        result[moduleName] = matches;
      }
    });

    return result;
  }, [groupedPermissions, permissionSearch]);

  // Toggle all permissions in a module
  const handleToggleModule = (moduleName, perms) => {
    const modulePermIds = perms.map((p) => p.id ?? p.name);
    const allSelected = modulePermIds.every((id) => selectedPermissionIds.includes(id));

    if (allSelected) {
      // Unselect all in this module
      setSelectedPermissionIds((prev) => prev.filter((id) => !modulePermIds.includes(id)));
    } else {
      // Select all in this module
      setSelectedPermissionIds((prev) => Array.from(new Set([...prev, ...modulePermIds])));
    }
  };

  // Toggle a single permission
  const handleToggleIndividual = (permId) => {
    setSelectedPermissionIds((prev) =>
      prev.includes(permId) ? prev.filter((id) => id !== permId) : [...prev, permId]
    );
  };

  // Select all permissions
  const handleSelectAll = () => {
    const allIds = allPermissionsList.map((p) => p.id ?? p.name);
    setSelectedPermissionIds(allIds);
  };

  // Deselect all permissions
  const handleDeselectAll = () => {
    setSelectedPermissionIds([]);
  };

  // Toggle module collapse state
  const toggleCollapse = (moduleName) => {
    setCollapsedModules((prev) => ({
      ...prev,
      [moduleName]: !prev[moduleName]
    }));
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

  const formatModuleName = (mod) => {
    if (!mod) return 'General';
    return mod.charAt(0).toUpperCase() + mod.slice(1);
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roleName.trim()) {
      setFormError('Role Name is required');
      return;
    }

    // Extract numeric IDs for backend API
    const numericPermissionIds = selectedPermissionIds
      .map((id) => {
        if (typeof id === 'number') return id;
        const num = Number(id);
        if (!isNaN(num) && Number.isInteger(num) && String(num) === String(id)) return num;
        const found = allPermissionsList.find((p) => p.name === id || p.id === id);
        return found?.id ? Number(found.id) : null;
      })
      .filter((id) => id !== null && !isNaN(id));

    const payload = {
      roleName: roleName.trim(),
      name: roleName.trim(),
      slug: `#role-${roleName.trim().toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      departmentId: selectedDepartment?.id || null,
      department: selectedDepartment,
      permissionIds: numericPermissionIds,
      permissions: selectedPermissionIds,
      description: description.trim(),
      status: 'ACTIVE'
    };

    if (onSave) {
      onSave(payload);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-role-modal-title"
    >
      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#006c49] border border-emerald-100/80 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 id="add-role-modal-title" className="text-lg font-bold text-slate-900">
                Add New Access Role
              </h3>
              <p className="text-xs text-slate-500">
                Define department scope, organizational privileges, and granular capability sets.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 bg-slate-50/20">
          {formError && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* 1. Role Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Role Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="e.g. Lead DevOps Architect"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-[#006c49] focus:ring-2 focus:ring-[#006c49]/15 transition"
            />
          </div>

          {/* 2. Role Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Description</span>
              <span className="text-[11px] font-normal text-slate-400">Optional</span>
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the role's purpose, responsibilities, or access level..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#006c49] focus:ring-2 focus:ring-[#006c49]/15 transition resize-none"
            />
          </div>

          {/* 3. Searchable Department Dropdown */}
          <div className="relative" ref={deptDropdownRef}>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Department Scope
            </label>

            {/* Department Trigger Button */}
            <div
              onClick={() => setDeptDropdownOpen(!deptDropdownOpen)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-xs sm:text-sm text-slate-800 flex items-center justify-between cursor-pointer transition select-none shadow-2xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                {selectedDepartment ? (
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-semibold text-slate-900">{selectedDepartment.name}</span>
                    {selectedDepartment.code && (
                      <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded">
                        {selectedDepartment.code}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-slate-400">
                    Workspace Global (Not tied to specific department)
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {selectedDepartment && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDepartment(null);
                    }}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                    title="Clear department"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${deptDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {/* Searchable Dropdown Popover */}
            {deptDropdownOpen && (
              <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-2xl border border-slate-200 shadow-xl z-30 overflow-hidden flex flex-col max-h-60 animate-in fade-in zoom-in-95 duration-100">
                {/* Search Field */}
                <div className="p-2.5 border-b border-slate-100 bg-slate-50/70">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      autoFocus
                      value={deptSearch}
                      onChange={(e) => setDeptSearch(e.target.value)}
                      placeholder="Search departments by name or code..."
                      className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#006c49]"
                    />
                    {deptSearch && (
                      <button
                        type="button"
                        onClick={() => setDeptSearch('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Dropdown Options List */}
                <div className="overflow-y-auto p-1.5 space-y-0.5 max-h-48 text-xs">
                  {/* Option: Global Workspace Role */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDepartment(null);
                      setDeptDropdownOpen(false);
                      setDeptSearch('');
                    }}
                    className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between transition cursor-pointer ${
                      selectedDepartment === null
                        ? 'bg-emerald-50 text-[#006c49] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                      <span>Workspace Global (Company-wide scope)</span>
                    </div>
                    {selectedDepartment === null && <Check className="w-4 h-4 text-[#006c49]" />}
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  {/* Filtered Departments */}
                  {loadingDepartments ? (
                    <div className="py-4 text-center text-slate-400 flex items-center justify-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Loading departments...</span>
                    </div>
                  ) : filteredDepartments.length === 0 ? (
                    <div className="py-4 text-center text-slate-400">
                      No departments match "{deptSearch}"
                    </div>
                  ) : (
                    filteredDepartments.map((dept) => {
                      const isSelected = selectedDepartment?.id === dept.id;
                      return (
                        <button
                          key={dept.id}
                          type="button"
                          onClick={() => {
                            setSelectedDepartment(dept);
                            setDeptDropdownOpen(false);
                            setDeptSearch('');
                          }}
                          className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between transition cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-50 text-[#006c49] font-semibold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="truncate">{dept.name}</span>
                            {dept.code && (
                              <span className="font-mono text-[10px] text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.2 rounded shrink-0">
                                {dept.code}
                              </span>
                            )}
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#006c49]" />}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 3. Role Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Role Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Summary of responsibilities, operational boundaries, and security clearance..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-[#006c49] focus:ring-2 focus:ring-[#006c49]/15 transition"
            />
          </div>

          {/* 4. Grouped Capabilities & Permissions Section */}
          <div className="space-y-2.5">
            {/* Permissions Header Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Capabilities & Permissions
                </label>
                <span className="text-[11px] text-slate-500 font-medium">
                  {selectedPermissionIds.length} of {allPermissionsList.length} permissions active
                </span>
              </div>

              {/* Fast Select Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#006c49] hover:bg-emerald-50 transition cursor-pointer"
                >
                  Select All
                </button>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={handleDeselectAll}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-500 hover:bg-slate-100 transition cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Permissions Search Bar */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={permissionSearch}
                onChange={(e) => setPermissionSearch(e.target.value)}
                placeholder="Search capabilities by name, module, or description..."
                className="w-full pl-8.5 pr-7 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#006c49] transition shadow-2xs"
              />
              {permissionSearch && (
                <button
                  type="button"
                  onClick={() => setPermissionSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Grouped Modules List */}
            <div className="border border-slate-200/80 rounded-2xl bg-white overflow-hidden max-h-72 overflow-y-auto divide-y divide-slate-100 p-1 shadow-2xs">
              {loadingPermissions ? (
                <div className="py-12 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin text-[#006c49]" />
                  <span className="text-xs">Fetching dynamic permission groups...</span>
                </div>
              ) : Object.keys(filteredGroupedPermissions).length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  {permissionSearch
                    ? `No capabilities match "${permissionSearch}"`
                    : 'No permissions found in the registry.'}
                </div>
              ) : (
                Object.entries(filteredGroupedPermissions).map(([moduleName, perms]) => {
                  const modulePermIds = perms.map((p) => p.id ?? p.name);
                  const selectedInModule = modulePermIds.filter((id) =>
                    selectedPermissionIds.includes(id)
                  );
                  const isAllSelected =
                    selectedInModule.length === modulePermIds.length && modulePermIds.length > 0;
                  const isPartialSelected =
                    selectedInModule.length > 0 && !isAllSelected;
                  const isCollapsed = Boolean(collapsedModules[moduleName]);

                  return (
                    <div key={moduleName} className="py-1.5 first:pt-0 last:pb-0">
                      {/* Module Header Strip with Group Master Checkbox */}
                      <div className="px-3 py-2 rounded-xl bg-slate-50/80 hover:bg-slate-100/70 transition flex items-center justify-between gap-3">
                        {/* Group Selection Checkbox + Title */}
                        <div
                          onClick={() => handleToggleModule(moduleName, perms)}
                          className="flex items-center gap-2.5 cursor-pointer select-none flex-1 min-w-0"
                        >
                          {/* Master Checkbox */}
                          <div
                            className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                              isAllSelected
                                ? 'bg-[#006c49] border-[#006c49] text-white'
                                : isPartialSelected
                                ? 'bg-emerald-100 border-[#006c49] text-[#006c49]'
                                : 'border-slate-300 bg-white hover:border-slate-400'
                            }`}
                          >
                            {isAllSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            {isPartialSelected && <Minus className="w-3 h-3 stroke-[3]" />}
                          </div>

                          <div className="flex items-center gap-2 truncate">
                            <Layers className="w-3.5 h-3.5 text-[#006c49] shrink-0" />
                            <span className="font-bold text-xs text-slate-800 capitalize">
                              {formatModuleName(moduleName)} Scope
                            </span>
                            <span className="text-[10px] text-slate-500 font-semibold bg-white border border-slate-200/80 px-1.5 py-0.2 rounded-md">
                              {selectedInModule.length} / {perms.length} selected
                            </span>
                          </div>
                        </div>

                        {/* Expand / Collapse Button */}
                        <button
                          type="button"
                          onClick={() => toggleCollapse(moduleName)}
                          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition cursor-pointer"
                          title={isCollapsed ? 'Expand module' : 'Collapse module'}
                        >
                          {isCollapsed ? (
                            <ChevronRight className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Nested Individual Permissions */}
                      {!isCollapsed && (
                        <div className="p-2 grid grid-cols-1 gap-1.5 mt-1">
                          {perms.map((perm) => {
                            const permIdentifier = perm.id ?? perm.name;
                            const isChecked = selectedPermissionIds.includes(permIdentifier);

                            return (
                              <div
                                key={perm.id || perm.name}
                                onClick={() => handleToggleIndividual(permIdentifier)}
                                className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex items-start gap-2.5 select-none ${
                                  isChecked
                                    ? 'bg-emerald-50/50 border-emerald-200 text-slate-900 shadow-2xs'
                                    : 'bg-white border-slate-100 hover:border-slate-200 text-slate-600 hover:bg-slate-50/50'
                                }`}
                              >
                                {/* Individual Checkbox */}
                                <div
                                  className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center shrink-0 border transition-all ${
                                    isChecked
                                      ? 'bg-[#006c49] border-[#006c49] text-white'
                                      : 'border-slate-300 bg-white'
                                  }`}
                                >
                                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>

                                {/* Permission Info */}
                                <div className="space-y-0.5 flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <code className="font-mono text-xs font-bold text-slate-800">
                                      {perm.name}
                                    </code>

                                    {perm.action && (
                                      <span
                                        className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded border ${getActionBadgeColor(
                                          perm.action
                                        )}`}
                                      >
                                        {perm.action}
                                      </span>
                                    )}
                                  </div>

                                  <p className="text-[11px] text-slate-500 leading-snug">
                                    {perm.description || 'No description assigned.'}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>


          {/* Modal Footer Controls */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#006c49] hover:bg-[#005236] text-white text-xs sm:text-sm font-semibold shadow-md shadow-emerald-700/20 transition cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Create Role</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
