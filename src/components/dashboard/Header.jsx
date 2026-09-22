import React from 'react';
import { Search, Bell, MessageSquare, Menu } from 'lucide-react';
import { DASHBOARD_DATA } from '../../data/dashboardData';

export default function Header({ onToggleSidebar, onSearch }) {
  const { user } = DASHBOARD_DATA;

  return (
    <header className="w-full flex items-center justify-between gap-4 pb-6">
      {/* Left: Mobile Menu Toggle + Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Open navigation menu"
          className="lg:hidden p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search task"
            onChange={(e) => onSearch && onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200/80 bg-white text-sm text-slate-800 placeholder-slate-400 shadow-2xs focus:outline-hidden focus:border-[#00c875] focus:ring-2 focus:ring-[#00c875]/15 transition"
          />
        </div>
      </div>

      {/* Right: Notification, Chat & User Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button
          type="button"
          aria-label="Notifications"
          onClick={() => alert('No new critical alerts.')}
          className="relative w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          {user.hasUnreadNotifications && (
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          )}
        </button>

        {/* Message Bubble */}
        <button
          type="button"
          aria-label="Messages"
          onClick={() => alert('Team chat opened.')}
          className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
        </button>

        {/* User Profile Card */}
        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition"
          />
          <div className="hidden sm:block text-left">
            <div className="text-sm font-bold text-slate-800 leading-tight">
              {user.name}
            </div>
            <div className="text-xs text-slate-400 leading-tight mt-0.5">
              {user.email}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
