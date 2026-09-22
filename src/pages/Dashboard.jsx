import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/dashboard/Header';
import MetricCards from '../components/dashboard/MetricCards';
import AnalyticsChart from '../components/dashboard/AnalyticsChart';
import TeamCollaboration from '../components/dashboard/TeamCollaboration';
import RecentActivity from '../components/dashboard/RecentActivity';
import BottomCards from '../components/dashboard/BottomCards';
import { Plus } from 'lucide-react';

export default function Dashboard({ onLogout }) {
  const [activeNavId, setActiveNavId] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#f4f7fa] text-slate-800 flex overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif] antialiased">
      {/* Dynamic Industry-Standard Sidebar Navigation */}
      <Sidebar
        activeId={activeNavId}
        onSelectNav={(id) => setActiveNavId(id)}
        onLogout={onLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Dashboard Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <div className="p-5 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto space-y-7">
          {/* Top Header Bar */}
          <Header
            onToggleSidebar={() => setIsSidebarOpen(true)}
            onSearch={(query) => console.log('Searching:', query)}
          />

          {/* Dashboard Title & Actions Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Dashboard
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Plan, prioritize, and accomplish your tasks with ease.
              </p>
            </div>

            {/* Create Project Button */}
            <div>
              <button
                type="button"
                onClick={() => alert('Create Project modal opened.')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#00c875] hover:bg-[#00b368] active:bg-[#009e5c] text-white text-sm font-bold shadow-md shadow-emerald-500/20 transition cursor-pointer active:scale-98"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Create Project</span>
              </button>
            </div>
          </div>

          {/* 1. Top Metric Cards (Active Projects, Completed Tasks, Team Members, Deadlines) */}
          <section aria-label="Key Performance Indicators">
            <MetricCards />
          </section>

          {/* 2. Middle Content Grid (Analytics Overview, Team Collaboration, Recent Activity) */}
          <section
            aria-label="Analytics and Team Activity"
            className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch"
          >
            {/* Analytics Overview (Left 6 cols) */}
            <div className="lg:col-span-6">
              <AnalyticsChart />
            </div>

            {/* Team Collaboration (Middle 3 cols) */}
            <div className="lg:col-span-3">
              <TeamCollaboration />
            </div>

            {/* Recent Activity (Right 3 cols) */}
            <div className="lg:col-span-3">
              <RecentActivity />
            </div>
          </section>

          {/* 3. Bottom Cards (Work Anywhere, Sprint Progress, Time Tracking) */}
          <section aria-label="Productivity and Sprint Tracking">
            <BottomCards />
          </section>
        </div>
      </div>
    </div>
  );
}
