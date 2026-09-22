import React from 'react';
import { DASHBOARD_DATA } from '../../data/dashboardData';

export default function RecentActivity() {
  const { recentActivity } = DASHBOARD_DATA;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100 flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          Recent Activity
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Latest updates
        </p>
      </div>

      {/* Activity Timeline List */}
      <div className="mt-5 space-y-4">
        {recentActivity.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 group hover:bg-slate-50/80 p-1.5 -mx-1.5 rounded-2xl transition-colors cursor-pointer"
          >
            {/* Initial Circle Badge */}
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${item.badgeColor}`}
            >
              {item.initials}
            </div>

            {/* Content & Target */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-700 leading-snug">
                <span className="font-bold text-slate-900">{item.author}</span>{' '}
                {item.action}{' '}
                <span className="font-semibold text-[#00c875]">
                  {item.target}
                </span>
              </p>
              <div className="text-[11px] text-slate-400 font-medium mt-1">
                {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
