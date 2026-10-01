import React from 'react';
import { UserCheck, ShieldCheck, Users, Lock } from 'lucide-react';
import { ROLES_DATA } from '../../data/rolesData';

export default function RolesStats() {
  const { stats } = ROLES_DATA;

  const renderIcon = (type) => {
    switch (type) {
      case 'user-check':
        return (
          <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#00c875] flex items-center justify-center">
            <UserCheck className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
      case 'shield-check':
        return (
          <div className="w-9 h-9 rounded-full bg-teal-50 text-teal-500 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
      case 'users':
        return (
          <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center">
            <Users className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
      case 'lock':
        return (
          <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
            <Lock className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
      default:
        return null;
    }
  };

  const getAccentBorderClass = (accentColor) => {
    switch (accentColor) {
      case '#00c875':
        return 'border-b-[#00c875]';
      case '#6366f1':
        return 'border-b-indigo-500';
      case '#f59e0b':
        return 'border-b-amber-500';
      default:
        return 'border-b-[#00c875]';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {stats.map((item) => (
        <div
          key={item.id}
          className={`bg-white rounded-2xl p-6 shadow-xs border border-slate-100/90 border-b-4 ${getAccentBorderClass(
            item.accentColor
          )} flex flex-col justify-between transition-all hover:shadow-sm`}
        >
          {/* Top Row: Title + Icon */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">
              {item.title}
            </span>
            {renderIcon(item.iconType)}
          </div>

          {/* Value + Pill Badge */}
          <div className="flex items-baseline gap-3 my-1">
            <span
              className={`font-black text-slate-900 tracking-tight leading-none ${
                item.value.length > 8 ? 'text-2xl' : 'text-3xl'
              }`}
            >
              {item.value}
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                item.pillType === 'teal'
                  ? 'bg-teal-50 text-teal-700 border border-teal-200/60'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
              }`}
            >
              {item.pill}
            </span>
          </div>

          {/* Subtitle / Footer Note */}
          <p className="text-xs text-slate-500 font-medium mt-3">
            {item.subtext}
          </p>
        </div>
      ))}
    </div>
  );
}
