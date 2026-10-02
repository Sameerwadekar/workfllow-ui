import React from 'react';
import { useSelector } from 'react-redux';
import { Search, Bell, MessageSquare, Menu } from 'lucide-react';
import { ROLES_DATA } from '../../data/rolesData';
import { selectUser } from '../../features/userSlice';

export default function RolesHeader({
  onToggleSidebar,
  searchQuery = '',
  onSearchChange
}) {
  const { workspace, currentUser: defaultUser } = ROLES_DATA;
  const reduxUser = useSelector(selectUser);
  const currentUser = {
    name: reduxUser?.name || defaultUser.name,
    email: reduxUser?.email || defaultUser.email,
    initials: reduxUser?.name
      ? reduxUser.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : defaultUser.initials,
    hasUnreadNotifications: defaultUser.hasUnreadNotifications
  };

  return (
    <header className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
      {/* Left: Mobile Toggle + Search + Active Roles Pill */}
      <div className="flex flex-wrap items-center gap-3.5 flex-1 min-w-0">
        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Open sidebar menu"
          className="lg:hidden p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search roles, permissions..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200/90 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs focus:outline-hidden focus:border-[#00c875] focus:ring-2 focus:ring-[#00c875]/15 transition"
          />
        </div>

        {/* Active Roles & Total Users Status Pill */}
        <div className="hidden xl:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200/80 bg-white shadow-2xs text-xs font-semibold text-slate-700">
          <span className="w-2 h-2 rounded-full bg-[#00c875] animate-pulse" />
          <span>{workspace.activeRolesCount} Roles Active</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500 font-medium">{workspace.totalUsersCount} Users</span>
        </div>
      </div>

      {/* Right: Notifications, Chat & User Profile */}
      <div className="flex items-center justify-end gap-3 shrink-0">
        {/* Notification Bell */}
        <button
          type="button"
          aria-label="Notifications"
          onClick={() => alert('No pending role access requests.')}
          className="relative w-9 h-9 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          {currentUser.hasUnreadNotifications && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00c875] ring-2 ring-white" />
          )}
        </button>

        {/* Message Square */}
        <button
          type="button"
          aria-label="Messages"
          onClick={() => alert('Audit chat logs opened.')}
          className="w-9 h-9 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
        </button>

        {/* User Card */}
        <div className="flex items-center gap-2.5 pl-2">
          <div className="w-9 h-9 rounded-full bg-[#00c875] text-white font-bold text-xs flex items-center justify-center shadow-xs">
            {currentUser.initials}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
              {currentUser.name}
            </div>
            <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
              {currentUser.email}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
