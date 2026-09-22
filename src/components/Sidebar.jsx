import React, { useState } from 'react';
import { NAVIGATION_CONFIG } from '../config/navigation';
import flowalertAppIcon from '../assets/icons/flowalert-app-icon.svg';
import { X } from 'lucide-react';

export default function Sidebar({
  activeId = 'overview',
  onSelectNav,
  onLogout,
  isOpen = false,
  onClose
}) {
  const [isLightMode, setIsLightMode] = useState(true);

  const handleNavClick = (item) => {
    if (item.type === 'action' && item.id === 'logout') {
      if (onLogout) onLogout();
      return;
    }
    if (item.type === 'toggle') {
      setIsLightMode((prev) => !prev);
      return;
    }
    if (onSelectNav) {
      onSelectNav(item.id);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 lg:w-72 bg-white lg:rounded-r-[36px] shadow-[6px_0_24px_-6px_rgba(15,23,42,0.04)] flex flex-col justify-between py-8 px-5 z-40 transition-transform duration-300 ease-in-out shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="flex items-center justify-between px-3 mb-8">
            <div className="flex items-center gap-3">
              <img
                src={flowalertAppIcon}
                alt="TaskFlow Logo"
                className="w-9 h-9 rounded-xl shadow-xs shadow-emerald-500/20 object-contain"
              />
              <span className="text-xl font-bold tracking-tight text-slate-900">
                TaskFlow
              </span>
            </div>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Navigation Loaded from navigation.js */}
          <nav aria-label="Main Navigation" className="space-y-1.5">
            {NAVIGATION_CONFIG.main.map((item) => {
              const Icon = item.icon;
              const isActive = activeId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#00c875] text-white shadow-md shadow-emerald-500/20'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Utility Navigation */}
        <div className="space-y-2 pt-6 border-t border-slate-100">
          {NAVIGATION_CONFIG.footer.map((item) => {
            const Icon = item.icon;

            // Handle Light Mode Toggle Switch
            if (item.type === 'toggle') {
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-slate-50/80 border border-slate-100/80"
                >
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                    <Icon className="w-4 h-4 text-amber-500" />
                    <span>{item.label}</span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isLightMode}
                    onClick={() => setIsLightMode(!isLightMode)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                      isLightMode ? 'bg-[#00c875]' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        isLightMode ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              );
            }

            // Standard Utility Links (Settings, Help, Logout)
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-sm font-medium transition cursor-pointer ${
                  item.id === 'logout'
                    ? 'text-slate-500 hover:text-rose-600 hover:bg-rose-50/60'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}
