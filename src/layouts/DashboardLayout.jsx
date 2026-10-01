import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout({ onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#f4f7fa] text-slate-800 flex overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif] antialiased">
      {/* Dynamic Industry-Standard Sidebar Navigation */}
      <Sidebar
        onLogout={onLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Workspace with standard Stitch padding and responsive container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <div className="p-5 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto space-y-7">
          <Outlet context={{ onToggleSidebar: () => setIsSidebarOpen(true) }} />
        </div>
      </div>
    </div>
  );
}
