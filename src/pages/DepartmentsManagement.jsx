import React, { useState, useEffect, useRef, useCallback, useId } from 'react';
import { useOutletContext, useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  Network,
  Plus,
  Search,
  Trash2,
  Pencil,
  CheckCircle2,
  RefreshCw,
  X,
  Menu,
  ChevronDown,
  RotateCcw,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from '../lib/department/departmentService';
import OrbitSpinner from '../components/ui/loaders/OrbitSpinner';
import AccessDenied from './AccessDenied';
import TablePagination from '../components/ui/TablePagination';

export default function DepartmentsManagement({ onToggleSidebar: propToggleSidebar, openCreateModal = false, openEditModal = false }) {
  let outletCtx = null;
  try {
    outletCtx = useOutletContext();
  } catch {
    outletCtx = null;
  }
  const onToggleSidebar = propToggleSidebar || outletCtx?.onToggleSidebar;
  const navigate = useNavigate();
  const location = useLocation();
  const { id: editDeptIdParam } = useParams();

  // Data & State
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAccessDenied, setIsAccessDenied] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  // Pagination & Filtering state
  const [page, setPage] = useState(0); // 0-indexed for Spring Data
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [paginationMeta, setPaginationMeta] = useState({
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 1,
    isFirst: true,
    isLast: true
  });

  const searchInputRef = useRef(null);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(
    Boolean(openCreateModal || location.pathname === '/departments/create')
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);

  // Form states
  const [newDeptForm, setNewDeptForm] = useState({
    name: '',
    description: '',
    status: 'ACTIVE'
  });
  const [editDeptForm, setEditDeptForm] = useState({
    id: null,
    name: '',
    description: '',
    status: 'ACTIVE'
  });
  const [submitting, setSubmitting] = useState(false);

  const deptNameId = useId();
  const deptDescId = useId();
  const deptStatusId = useId();
  const editDeptNameId = useId();
  const editDeptDescId = useId();
  const editDeptStatusId = useId();

  // Debounce search input (350ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Global shortcut (⌘K or Ctrl+K) to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Fetch paginated departments for the tenant
  const fetchDepartmentsList = useCallback(async () => {
    setLoading(true);
    setError(null);

    const params = {
      page,
      size: pageSize,
      sort: `${sortBy},${sortDir}`
    };
    if (debouncedSearch && debouncedSearch.trim()) {
      params.search = debouncedSearch.trim();
    }
    if (statusFilter && statusFilter !== 'ALL') {
      params.status = statusFilter;
    }

    try {
      const response = await getDepartments(params);
      const list = response?.data?.data || [];
      setDepartments(Array.isArray(list) ? list : []);

      if (response?.data?.meta) {
        setPaginationMeta(response.data.meta);
      } else {
        setPaginationMeta({
          page,
          size: pageSize,
          totalElements: list.length,
          totalPages: Math.ceil(list.length / pageSize) || 1,
          isFirst: page === 0,
          isLast: true
        });
      }
    } catch (err) {
      console.error('Failed to fetch departments:', err);
      if (err?.response?.status === 403) {
        setIsAccessDenied(true);
      } else {
        setError(err?.response?.data?.message || 'Failed to load departments. Ensure AuthServiceRBAC is running.');
      }
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, sortBy, sortDir, debouncedSearch, statusFilter]);

  useEffect(() => {
    fetchDepartmentsList();
  }, [fetchDepartmentsList]);

  // Route-based modal openers
  useEffect(() => {
    if (openCreateModal || location.pathname === '/departments/create') {
      setIsAddModalOpen(true);
    }
  }, [openCreateModal, location.pathname]);

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    if (location.pathname === '/departments/create') {
      navigate('/departments', { replace: true });
    }
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
    if (location.pathname !== '/departments/create') {
      navigate('/departments/create');
    }
  };

  const handleOpenEditModal = (dept) => {
    setSelectedDept(dept);
    setEditDeptForm({
      id: dept.id,
      name: dept.name || '',
      description: dept.description || '',
      status: dept.status || 'ACTIVE'
    });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditDeptForm({ id: null, name: '', description: '', status: 'ACTIVE' });
    setSelectedDept(null);
    if (location.pathname.startsWith('/departments/edit')) {
      navigate('/departments', { replace: true });
    }
  };

  const handleCreateDepartment = async (e) => {
    e.preventDefault();
    if (!newDeptForm.name.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      await createDepartment({
        name: newDeptForm.name.trim(),
        description: newDeptForm.description.trim() || null,
        status: newDeptForm.status
      });
      setSuccessMessage(`Department "${newDeptForm.name.trim()}" created successfully.`);
      handleCloseAddModal();
      setNewDeptForm({ name: '', description: '', status: 'ACTIVE' });
      await fetchDepartmentsList();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create department.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateDepartment = async (e) => {
    e.preventDefault();
    if (!editDeptForm.name.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      await updateDepartment(editDeptForm.id, {
        name: editDeptForm.name.trim(),
        description: editDeptForm.description.trim() || null,
        status: editDeptForm.status
      });
      setSuccessMessage(`Department "${editDeptForm.name.trim()}" updated successfully.`);
      handleCloseEditModal();
      await fetchDepartmentsList();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update department.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteDepartment = async (dept) => {
    if (!window.confirm(`Are you sure you want to permanently delete department "${dept.name}"?`)) {
      return;
    }
    try {
      await deleteDepartment(dept.id);
      setSuccessMessage(`Department "${dept.name}" deleted.`);
      await fetchDepartmentsList();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete department.');
    }
  };

  useEffect(() => {
    if ((openEditModal || location.pathname.startsWith('/departments/edit')) && editDeptIdParam && departments.length > 0) {
      const found = departments.find((d) => String(d.id) === String(editDeptIdParam));
      if (found) {
        handleOpenEditModal(found);
      }
    }
  }, [openEditModal, editDeptIdParam, departments, location.pathname]);

  const handleToggleSort = (field) => {
    if (sortBy === field) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortDir(field === 'name' ? 'asc' : 'desc');
    }
    setPage(0);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setDebouncedSearch('');
    setStatusFilter('ALL');
    setSortBy('createdAt');
    setSortDir('desc');
    setPage(0);
  };

  const getSortLabel = (field, dir) => {
    if (field === 'name') {
      return dir === 'asc' ? 'Name (A–Z)' : 'Name (Z–A)';
    }
    return dir === 'desc' ? 'Created (Newest)' : 'Created (Oldest)';
  };

  const renderSortIcon = (field) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="w-3 h-3 text-slate-300 group-hover:text-slate-500" />;
    }
    return sortDir === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 text-[#10b981]" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-[#10b981]" />
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  if (isAccessDenied) {
    return (
      <AccessDenied
        requiredPermission="department.view"
        targetResource="Departments Management (/departments)"
        requiredRole="Company Administrator"
        policyRule="Policy Rule #POL-DEPT-SEC"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Departments & Business Units
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Organize company business units, operational squads, and cost centers.
          </p>
        </div>

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

          <button
            type="button"
            onClick={fetchDepartmentsList}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006c49] hover:bg-[#005236] text-white text-sm font-semibold shadow-md shadow-emerald-700/20 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Department</span>
          </button>
        </div>
      </div>

      {/* Alert Notices */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center justify-between">
          <span>{error}</span>
          <button type="button" onClick={() => setError(null)} className="cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
          <button type="button" onClick={() => setSuccessMessage(null)} className="cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search, Filter & Quick Query Strip */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-4 flex flex-col gap-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setSearchTerm('');
                  setDebouncedSearch('');
                  setPage(0);
                }
              }}
              placeholder="Search by department name or description..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#10b981]/40 transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setDebouncedSearch('');
                  setPage(0);
                  searchInputRef.current?.focus();
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-200/80 transition cursor-pointer flex items-center justify-center"
                title="Cancel search"
                aria-label="Cancel search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filters & Sort Controls */}
          <div className="lg:col-span-7 flex items-center gap-2.5 flex-wrap sm:flex-nowrap justify-start lg:justify-end">
            {/* Status Filter Dropdown */}
            <div className="relative flex-1 sm:flex-initial min-w-[130px]">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(0);
                }}
                className="w-full appearance-none pl-3.5 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-[#10b981]/40 cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                <option value="ACTIVE">Active Only</option>
                <option value="INACTIVE">Inactive Only</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex-1 sm:flex-initial min-w-[165px]">
              <select
                value={`${sortBy},${sortDir}`}
                onChange={(e) => {
                  const [field, dir] = e.target.value.split(',');
                  setSortBy(field);
                  setSortDir(dir);
                  setPage(0);
                }}
                className="w-full appearance-none pl-3.5 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-[#10b981]/40 cursor-pointer"
              >
                <option value="createdAt,desc">Created: Newest First</option>
                <option value="createdAt,asc">Created: Oldest First</option>
                <option value="name,asc">Name: A to Z</option>
                <option value="name,desc">Name: Z to A</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>

            {/* Rows Per Page Dropdown */}
            <div className="relative flex-1 sm:flex-initial min-w-[110px]">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(0);
                }}
                className="w-full appearance-none pl-3.5 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-[#10b981]/40 cursor-pointer"
              >
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
                <option value={50}>50 / page</option>
                <option value={100}>100 / page</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>

            {/* Reset Filters Button */}
            <button
              type="button"
              onClick={handleResetFilters}
              title="Reset search and filters"
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors flex items-center justify-center cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Active Filters Badges */}
        {(debouncedSearch || statusFilter !== 'ALL' || sortBy !== 'createdAt' || sortDir !== 'desc') && (
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
              Active Filters:
            </span>

            {debouncedSearch && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium text-[11px]">
                Search: <strong className="text-[#006c49]">"{debouncedSearch}"</strong>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setPage(0);
                  }}
                  className="hover:text-rose-600 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {statusFilter !== 'ALL' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium text-[11px]">
                Status: <strong>{statusFilter === 'ACTIVE' ? 'Active Only' : 'Inactive Only'}</strong>
                <button
                  type="button"
                  onClick={() => {
                    setStatusFilter('ALL');
                    setPage(0);
                  }}
                  className="hover:text-rose-600 cursor-pointer"
                  title="Reset status"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {(sortBy !== 'createdAt' || sortDir !== 'desc') && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium text-[11px]">
                Sort: <strong>{getSortLabel(sortBy, sortDir)}</strong>
                <button
                  type="button"
                  onClick={() => {
                    setSortBy('createdAt');
                    setSortDir('desc');
                    setPage(0);
                  }}
                  className="hover:text-rose-600 cursor-pointer"
                  title="Reset sort"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={handleResetFilters}
              className="text-[#006c49] hover:underline font-semibold ml-1 cursor-pointer text-[11px]"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Primary High-Fidelity Data Table Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden flex flex-col">
        {/* Content View */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <OrbitSpinner size="lg" />
            <span className="text-xs text-slate-500 font-medium">Loading departments...</span>
          </div>
        ) : departments.length === 0 ? (
          <div className="py-16 text-center">
            <Network className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-700">No departments found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              {debouncedSearch || statusFilter !== 'ALL'
                ? 'No departments match your filter criteria. Try adjusting your query.'
                : 'No departments created yet for this organization. Click "Add Department" to get started.'}
            </p>
            {(debouncedSearch || statusFilter !== 'ALL') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider select-none">
                  <th
                    className="py-3 px-5 cursor-pointer hover:text-slate-700 transition-colors group"
                    onClick={() => handleToggleSort('name')}
                    title="Click to sort by Department Name"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Department Name</span>
                      {renderSortIcon('name')}
                    </div>
                  </th>
                  <th className="py-3 px-5">Description</th>
                  <th className="py-3 px-5 text-center">Status</th>
                  <th
                    className="py-3 px-5 cursor-pointer hover:text-slate-700 transition-colors group"
                    onClick={() => handleToggleSort('createdAt')}
                    title="Click to sort by Creation Date"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Created Date</span>
                      {renderSortIcon('createdAt')}
                    </div>
                  </th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {departments.map((dept) => {
                  const isActive = dept.status === 'ACTIVE';
                  return (
                    <tr key={dept.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-5 font-semibold text-slate-900 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#006c49] font-bold">
                          {dept.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span>{dept.name}</span>
                          <div className="text-[10px] text-slate-400 font-mono font-normal">
                            ID: #{dept.id}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-5 text-slate-600 font-normal max-w-xs truncate" title={dept.description || ''}>
                        {dept.description || '—'}
                      </td>

                      <td className="py-3.5 px-5 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                            isActive
                              ? 'bg-emerald-50 text-[#006c49] border border-emerald-200/80'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? 'bg-[#10b981]' : 'bg-slate-400'
                            }`}
                          />
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>

                      <td className="py-3.5 px-5 text-slate-500 font-medium text-[11px]">
                        {formatDate(dept.createdAt)}
                      </td>

                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(dept)}
                            title="Edit Department"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteDepartment(dept)}
                            title="Delete Department"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Enterprise Bottom Pagination Bar */}
        <TablePagination
          currentPage={page}
          totalPages={paginationMeta.totalPages || 1}
          totalElements={paginationMeta.totalElements || 0}
          pageSize={pageSize}
          pageSizeOptions={[10, 20, 50, 100]}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPage(0);
          }}
          itemLabel="departments"
        />
      </div>

      {/* Add Department Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Create Department</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Define a new operational business unit or cost center.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseAddModal}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDepartment} className="space-y-4">
              <div>
                <label htmlFor={deptNameId} className="block text-xs font-semibold text-slate-700 mb-1">
                  Department Name *
                </label>
                <input
                  id={deptNameId}
                  type="text"
                  required
                  value={newDeptForm.name}
                  onChange={(e) => setNewDeptForm({ ...newDeptForm, name: e.target.value })}
                  placeholder="e.g. Engineering, Sales, Human Resources"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#10b981]"
                />
              </div>

              <div>
                <label htmlFor={deptDescId} className="block text-xs font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  id={deptDescId}
                  rows={3}
                  value={newDeptForm.description}
                  onChange={(e) => setNewDeptForm({ ...newDeptForm, description: e.target.value })}
                  placeholder="Optional details about function, squads, or allocation..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#10b981] resize-none"
                />
              </div>

              <div>
                <label htmlFor={deptStatusId} className="block text-xs font-semibold text-slate-700 mb-1">
                  Department Status
                </label>
                <select
                  id={deptStatusId}
                  value={newDeptForm.status}
                  onChange={(e) => setNewDeptForm({ ...newDeptForm, status: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#10b981] cursor-pointer"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleCloseAddModal}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#006c49] hover:bg-[#005236] text-white text-xs font-semibold shadow-md shadow-emerald-700/20 transition cursor-pointer disabled:opacity-60"
                >
                  {submitting && <OrbitSpinner size="sm" />}
                  <span>{submitting ? 'Creating...' : 'Create Department'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Department Modal */}
      {isEditModalOpen && selectedDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Edit Department</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update unit name, mission, or lifecycle status.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseEditModal}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateDepartment} className="space-y-4">
              <div>
                <label htmlFor={editDeptNameId} className="block text-xs font-semibold text-slate-700 mb-1">
                  Department Name *
                </label>
                <input
                  id={editDeptNameId}
                  type="text"
                  required
                  value={editDeptForm.name}
                  onChange={(e) => setEditDeptForm({ ...editDeptForm, name: e.target.value })}
                  placeholder="e.g. Engineering, Sales, Human Resources"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#10b981]"
                />
              </div>

              <div>
                <label htmlFor={editDeptDescId} className="block text-xs font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  id={editDeptDescId}
                  rows={3}
                  value={editDeptForm.description}
                  onChange={(e) => setEditDeptForm({ ...editDeptForm, description: e.target.value })}
                  placeholder="Optional details about function, squads, or allocation..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#10b981] resize-none"
                />
              </div>

              <div>
                <label htmlFor={editDeptStatusId} className="block text-xs font-semibold text-slate-700 mb-1">
                  Department Status
                </label>
                <select
                  id={editDeptStatusId}
                  value={editDeptForm.status}
                  onChange={(e) => setEditDeptForm({ ...editDeptForm, status: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#10b981] cursor-pointer"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#006c49] hover:bg-[#005236] text-white text-xs font-semibold shadow-md shadow-emerald-700/20 transition cursor-pointer disabled:opacity-60"
                >
                  {submitting && <OrbitSpinner size="sm" />}
                  <span>{submitting ? 'Saving Changes...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
