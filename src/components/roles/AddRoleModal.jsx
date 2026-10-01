import React, { useState } from 'react';
import { X, Shield, Plus, Check } from 'lucide-react';

export default function AddRoleModal({ isOpen, onClose, onSave }) {
  const [roleName, setRoleName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Engineering');
  const [description, setDescription] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([
    'project:read',
    'task:assign'
  ]);
  const [enforce2FA, setEnforce2FA] = useState(true);

  if (!isOpen) return null;

  const availablePermissions = [
    { code: 'all:*', label: 'Full Unrestricted Access' },
    { code: 'bypass:2fa', label: 'Bypass Multi-Factor Auth' },
    { code: 'manage:billing', label: 'Billing & Seat Upgrades' },
    { code: 'project:create', label: 'Create & Archive Projects' },
    { code: 'project:read', label: 'View Internal Projects' },
    { code: 'sprint:edit', label: 'Manage Sprint Roadmaps' },
    { code: 'task:assign', label: 'Assign & Reorder Tasks' },
    { code: 'repo:write', label: 'Push to Repositories' },
    { code: 'deploy:staging', label: 'Deploy Staging Workloads' },
    { code: 'deploy:prod', label: 'Deploy Production Clusters' },
    { code: 'assets:upload', label: 'Manage Design Tokens' },
    { code: 'view:logs', label: 'Read-only Security Logs' }
  ];

  const handleTogglePermission = (code) => {
    setSelectedPermissions((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const handleNameChange = (val) => {
    setRoleName(val);
    const generated = val
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
    setSlug(generated ? `#role-${generated}` : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        name: roleName || 'Custom Operator',
        slug: slug || '#role-custom',
        category,
        description,
        permissions: selectedPermissions,
        enforce2FA
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#00c875] flex items-center justify-center">
              <Shield className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Add New Access Role
              </h3>
              <p className="text-xs text-slate-500">
                Define organizational privileges and boundary scopes
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {/* Role Name & Auto Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Role Name
              </label>
              <input
                type="text"
                required
                value={roleName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. DevOps Engineer"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#00c875] focus:ring-2 focus:ring-[#00c875]/15 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Role Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="#role-devops"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-sm text-slate-600 focus:outline-hidden focus:border-[#00c875] focus:ring-2 focus:ring-[#00c875]/15 transition"
              />
            </div>
          </div>

          {/* Department / Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Department Scope
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-hidden focus:border-[#00c875] focus:ring-2 focus:ring-[#00c875]/15 transition"
            >
              <option value="Administration">Administration</option>
              <option value="Engineering">Engineering</option>
              <option value="Design & Product">Design & Product</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Role Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Summary of responsibilities and permissions..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#00c875] focus:ring-2 focus:ring-[#00c875]/15 transition"
            />
          </div>

          {/* Capabilities / Permissions */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Capabilities & Permissions
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 border border-slate-100 rounded-2xl bg-slate-50/50">
              {availablePermissions.map((perm) => {
                const isChecked = selectedPermissions.includes(perm.code);
                return (
                  <button
                    key={perm.code}
                    type="button"
                    onClick={() => handleTogglePermission(perm.code)}
                    className={`flex items-start gap-2.5 p-2 rounded-xl text-left border text-xs transition cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-50/70 border-emerald-300/80 text-emerald-900 font-semibold'
                        : 'bg-white border-slate-200/70 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center shrink-0 border ${
                        isChecked
                          ? 'bg-[#00c875] border-[#00c875] text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="font-mono text-[11px] leading-tight text-slate-800">
                        {perm.code}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {perm.label}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2FA Enforce Switch */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <div className="text-xs font-bold text-slate-800">
                Enforce Hardware 2FA & WebAuthn
              </div>
              <div className="text-[11px] text-slate-400">
                Mandatory step-up authentication on sensitive operations
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={enforce2FA}
              onClick={() => setEnforce2FA(!enforce2FA)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                enforce2FA ? 'bg-[#00c875]' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  enforce2FA ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#00c875] hover:bg-[#00b368] text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Create Role</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
