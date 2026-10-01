import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import Header from '../components/dashboard/Header';

export default function PlaceholderPage({ title, description, badge }) {
  const outletCtx = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      <Header onToggleSidebar={outletCtx?.onToggleSidebar} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {title}
            </h1>
            {badge && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-[#006c49]">
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-1">
            {description || 'This module is actively being configured for your workspace.'}
          </p>
        </div>
      </div>

      <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-slate-100 p-8 shadow-xs">
        <h2 className="text-xl font-bold text-slate-800">{title} Workspace</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          {description || 'This section is under active development. Select another module from the sidebar.'}
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-5 py-2.5 rounded-2xl bg-[#00c875] text-white text-xs font-bold shadow-xs hover:bg-[#00b368] transition cursor-pointer"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </>
  );
}
