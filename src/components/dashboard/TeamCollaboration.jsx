import React from 'react';
import { DASHBOARD_DATA } from '../../data/dashboardData';

export default function TeamCollaboration() {
  const { teamCollaboration } = DASHBOARD_DATA;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100 flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          Team Collaboration
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Recent team updates
        </p>
      </div>

      {/* Team Member Updates List */}
      <div className="mt-5 space-y-4">
        {teamCollaboration.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between gap-3 group hover:bg-slate-50/80 p-1.5 -mx-1.5 rounded-2xl transition-colors cursor-pointer"
          >
            {/* Avatar & Member Details */}
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-slate-100"
              />
              <div className="min-w-0">
                <div className="text-sm font-bold text-slate-800 truncate">
                  {member.name}
                </div>
                <div className="text-xs text-slate-400 truncate mt-0.5">
                  {member.activity}
                </div>
              </div>
            </div>

            {/* Timestamp */}
            <span className="text-xs text-slate-400 font-medium shrink-0">
              {member.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
