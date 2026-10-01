import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectUser,
  selectUserLoading,
  selectUserPermissionNames
} from '../features/userSlice';
import {
  NAVIGATION_CONFIG,
  FOOTER_NAVIGATION,
  filterNavigation
} from '../config/navigation';
import flowalertAppIcon from '../assets/icons/flowalert-app-icon.svg';
import OrbitSpinner from './ui/loaders/OrbitSpinner';
import {
  X,
  ChevronDown,
  PlusCircle,
  Archive,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({
  activeId,
  onSelectNav,
  onLogout,
  isOpen = false,
  onClose
}) {
  // Default expanded accordion submenus
  const [expandedMenus, setExpandedMenus] = useState({
    projects: true,
    tasks: false
  });

  const location = useLocation();
  const navigate = useNavigate();

  const currentUser = useSelector(selectUser);
  const isUserLoading = useSelector(selectUserLoading);
  const userPermissions = useSelector(selectUserPermissionNames);

  // Industry-Standard: Sidebar is purely a representation of user.permissions
  const navItems = useMemo(
    () => filterNavigation(NAVIGATION_CONFIG, userPermissions),
    [userPermissions]
  );
  const footerItems = useMemo(
    () => filterNavigation(FOOTER_NAVIGATION, userPermissions),
    [userPermissions]
  );

  const prevPathRef = useRef(location.pathname);

  // Automatically expand parent submenu if a child route is active on route change
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      navItems.forEach((item) => {
        if (item.children?.some((child) => child.path && location.pathname === child.path)) {
          setExpandedMenus((prev) => ({ ...prev, [item.id]: true }));
        }
      });
    }
  }, [location.pathname, navItems]);

  const toggleSubmenu = (itemId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleNavClick = (item) => {
    if (item.type === 'action' && item.id === 'logout') {
      if (onLogout) onLogout();
      return;
    }
    if (item.path) {
      navigate(item.path);
    }
    if (onSelectNav) {
      onSelectNav(item.id);
    }
    if (onClose) {
      onClose();
    }
  };

  const handleParentClick = (item) => {
    if (item.children && item.children.length > 0) {
      toggleSubmenu(item.id);
      return;
    }
    handleNavClick(item);
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
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 lg:w-72 bg-white lg:rounded-r-[36px] shadow-[6px_0_24px_-6px_rgba(15,23,42,0.04)] flex flex-col justify-between py-8 px-5 z-40 transition-transform duration-300 ease-in-out shrink-0 overflow-y-auto ${
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
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  TaskFlow
                </span>
                {currentUser?.tenant?.name && (
                  <span className="text-[11px] text-slate-400 font-medium truncate max-w-[130px]">
                    {currentUser.tenant.name}
                  </span>
                )}
              </div>
            </div>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Navigation - Permission Filtered */}
          {isUserLoading && !currentUser ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
              <OrbitSpinner size="md" />
              <span className="text-xs font-medium">Resolving permissions...</span>
            </div>
          ) : (
            <nav aria-label="Main Navigation" className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isExpanded = Boolean(expandedMenus[item.id]);
                const isParentActive =
                  (item.path && (location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path + '/')))) ||
                  activeId === item.id ||
                  (hasChildren && item.children.some((child) => (child.path && location.pathname === child.path) || activeId === child.id));

                return (
                  <div key={item.id} className="flex flex-col gap-1 w-full">
                    {/* Main Nav Button */}
                    <button
                      type="button"
                      onClick={() => handleParentClick(item)}
                      aria-expanded={hasChildren ? isExpanded : undefined}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                        isParentActive && !hasChildren
                          ? 'bg-[#00c875] text-white shadow-md shadow-emerald-500/20'
                          : isParentActive && hasChildren
                          ? 'bg-slate-100/80 text-slate-900'
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <Icon
                          className={`w-5 h-5 shrink-0 transition-colors ${
                            isParentActive && !hasChildren
                              ? 'text-white'
                              : isParentActive
                              ? 'text-[#006c49]'
                              : 'text-slate-400'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>

                      {/* Right elements: Badge & Chevron */}
                      <div className="flex items-center gap-1.5">
                        {item.badge !== null && item.badge !== undefined && (
                          <span
                            className={`px-1.5 py-0.5 rounded-full text-[11px] font-bold ${
                              isParentActive && !hasChildren
                                ? 'bg-white/20 text-white'
                                : 'bg-emerald-50 text-[#006c49]'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}

                        {hasChildren && (
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : 'rotate-0'
                            }`}
                          />
                        )}
                      </div>
                    </button>

                    {/* Nested Accordion Submenu */}
                    {hasChildren && isExpanded && (
                      <div className="relative flex flex-col pl-7 pr-1 py-1 gap-1 text-slate-500 transition-all duration-300">
                        {/* Tree vertical guide line */}
                        <div className="absolute left-4 top-1 bottom-3 w-px bg-slate-200/80 rounded-full" />

                        {item.children.map((child) => {
                          if (child.isAction) {
                            return (
                              <button
                                key={child.id}
                                type="button"
                                onClick={() => handleNavClick(child)}
                                className="mt-1 flex items-center gap-2 px-3 py-1.5 rounded-xl font-medium text-xs text-[#006c49] bg-[#10b981]/10 hover:bg-[#10b981]/20 transition-colors w-full text-left cursor-pointer"
                              >
                                <PlusCircle className="w-3.5 h-3.5 text-[#006c49]" />
                                <span>{child.actionLabel}</span>
                              </button>
                            );
                          }

                          if (child.isCollapsedFolder) {
                            return (
                              <button
                                key={child.id}
                                type="button"
                                onClick={() => handleNavClick(child)}
                                className="group relative flex items-center justify-between px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                              >
                                <div className="flex items-center gap-2">
                                  <Archive className="w-3.5 h-3.5 text-slate-400" />
                                  <span>{child.label}</span>
                                </div>
                                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                              </button>
                            );
                          }

                          const isChildActive = (child.path && location.pathname === child.path) || activeId === child.id;

                          return (
                            <button
                              key={child.id}
                              type="button"
                              onClick={() => handleNavClick(child)}
                              className={`group relative flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                                isChildActive
                                  ? 'bg-[#10b981]/15 text-[#006c49] font-semibold shadow-xs ring-1 ring-[#10b981]/20'
                                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                    isChildActive
                                      ? 'bg-[#006c49] ring-2 ring-[#10b981]/30'
                                      : 'bg-slate-300 group-hover:bg-[#10b981]'
                                  }`}
                                />
                                <span>{child.label}</span>
                              </div>

                              {child.count !== undefined && child.count !== null && (
                                <span
                                  className={`text-[11px] font-medium ${
                                    isChildActive
                                      ? 'px-1.5 py-0.5 rounded-full bg-[#10b981] text-white font-bold'
                                      : 'text-slate-400 group-hover:text-slate-600'
                                  }`}
                                >
                                  {child.count}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          )}
        </div>

        {/* Bottom Utility Navigation */}
        <div className="space-y-2 pt-6 border-t border-slate-100">
          {footerItems.map((item) => {
            const Icon = item.icon;
            const isActive = (item.path && location.pathname === item.path) || activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-sm font-semibold transition cursor-pointer ${
                  item.id === 'logout'
                    ? 'text-slate-500 hover:text-rose-600 hover:bg-rose-50/60'
                    : isActive
                    ? 'bg-[#00c875] text-white shadow-md shadow-emerald-500/20'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}
