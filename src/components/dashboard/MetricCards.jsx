import React from 'react';
import { Folder, CheckCircle, Users, Calendar } from 'lucide-react';
import { DASHBOARD_DATA } from '../../data/dashboardData';

export default function MetricCards() {
  const { metrics } = DASHBOARD_DATA;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {metrics.map((card) => {
        return (
          <div
            key={card.id}
            className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100 flex flex-col justify-between hover:shadow-md hover:border-slate-200/80 transition-all duration-200"
          >
            {/* Header: Icon + Title */}
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  card.color === 'emerald'
                    ? 'bg-emerald-50 text-[#00c875]'
                    : card.color === 'cyan'
                    ? 'bg-sky-50 text-cyan-600'
                    : 'bg-amber-50 text-amber-500'
                }`}
              >
                {card.iconType === 'folder' && <Folder className="w-4 h-4" />}
                {card.iconType === 'check' && <CheckCircle className="w-4 h-4" />}
                {card.iconType === 'users' && <Users className="w-4 h-4" />}
                {card.iconType === 'calendar' && <Calendar className="w-4 h-4" />}
              </div>
              <span className="text-xs font-semibold text-slate-500 tracking-wide">
                {card.title}
              </span>
            </div>

            {/* Metric Value */}
            <div className="mt-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
                {card.value}
              </div>

              {/* Subtext / Badge / Avatars */}
              <div className="mt-3 flex items-center justify-between">
                {card.badgeText && (
                  <span className="text-xs font-bold text-[#00c875]">
                    {card.badgeText}
                  </span>
                )}

                {card.subtext && (
                  <span className="text-xs font-medium text-slate-400">
                    {card.subtext}
                  </span>
                )}

                {/* Overlapping Avatar Stack for Team Members */}
                {card.avatars && (
                  <div className="flex items-center -space-x-2">
                    {card.avatars.map((imgUrl, i) => (
                      <img
                        key={i}
                        src={imgUrl}
                        alt={`Member ${i + 1}`}
                        className="w-7 h-7 rounded-full object-cover ring-2 ring-white"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
