import React from 'react';
import { X, FileSpreadsheet, Download, CheckCircle2 } from 'lucide-react';
import { ROLES_DATA } from '../../data/rolesData';

export default function ExportMatrixModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleExportCSV = () => {
    alert('Roles & Permissions Matrix exported as CSV format.');
    onClose();
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(ROLES_DATA, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'taskflow-rbac-matrix.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#00c875] flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Export Access Matrix
              </h3>
              <p className="text-xs text-slate-500">
                Download comprehensive RBAC mappings for compliance audit
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

        {/* Content */}
        <div className="p-6 space-y-4 text-xs text-slate-600">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between font-semibold text-slate-700">
              <span>Organization</span>
              <span className="text-slate-900 font-bold">{ROLES_DATA.workspace.name}</span>
            </div>
            <div className="flex items-center justify-between font-semibold text-slate-700">
              <span>Standard</span>
              <span className="text-emerald-600 font-bold">RBAC 2.1 Specification</span>
            </div>
            <div className="flex items-center justify-between font-semibold text-slate-700">
              <span>Total Role Definitions</span>
              <span className="text-slate-900 font-bold">{ROLES_DATA.roles.length} Roles</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Included in Export:
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00c875]" />
                <span>Scope permissions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00c875]" />
                <span>User seat bindings</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00c875]" />
                <span>2FA enforce policies</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00c875]" />
                <span>Security logs mapping</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV Matrix</span>
          </button>
          <button
            type="button"
            onClick={handleExportJSON}
            className="px-5 py-2 rounded-xl bg-[#00c875] hover:bg-[#00b368] text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Download JSON</span>
          </button>
        </div>
      </div>
    </div>
  );
}
