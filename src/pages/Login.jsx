import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';
import flowalertAppIcon from '../assets/icons/flowalert-app-icon.svg';
import { Users, CheckCircle2 } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [userSession, setUserSession] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUserSession(userData);
    if (onLoginSuccess) {
      onLoginSuccess(userData);
    }
  };

  const handleLogout = () => {
    setUserSession(null);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#ebfaf5] via-[#f1fbf8] to-[#edf8f5] text-slate-800 flex flex-col justify-between relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] antialiased">
      {/* Soft Ambient Blurred Glow Orbs */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#a7f3d0]/30 rounded-full blur-[130px] pointer-events-none -z-0" />
      <div className="absolute top-1/3 -left-36 w-[650px] h-[650px] bg-[#99f6e4]/30 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute -bottom-24 right-1/4 w-[450px] h-[450px] bg-[#ccfbf1]/40 rounded-full blur-[100px] pointer-events-none -z-0" />

      {/* Top Header Navigation */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <img
            src={flowalertAppIcon}
            alt="FlowAlert Logo"
            className="w-10 h-10 rounded-xl shadow-md shadow-emerald-500/20 shrink-0 object-contain hover:scale-105 transition-transform"
          />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            TaskFlow
          </span>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 hidden sm:inline">
            Need an account?
          </span>
          <button
            type="button"
            onClick={() => alert('Start Free Trial clicked.')}
            className="px-4 py-2 rounded-xl border border-emerald-200/80 bg-white/70 hover:bg-white text-emerald-800 text-sm font-medium shadow-xs transition cursor-pointer"
          >
            Start Free Trial
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-6 lg:py-12">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Hero Showcase & Metrics */}
          <div className="lg:col-span-6 space-y-7 text-left">
            {/* Version Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8fbf2] border border-[#a7f3d0] text-[#00a862] text-xs font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#00c875]" />
              <span>VERSION 2.6 ACTIVE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[50px] font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Plan, prioritize, and <br />
              accomplish your tasks <br />
              with ease.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-500 max-w-lg leading-relaxed">
              Access your unified workspace, real-time analytics, and seamless team collaboration from one beautiful interface.
            </p>

            {/* Stat Cards Container */}
            <div className="space-y-4 pt-2">
              {/* Card 1: Completed Tasks */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#e6fbf2] flex items-center justify-center text-[#00c875] shrink-0">
                    <svg className="w-6 h-6 text-[#00c875]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      COMPLETED TASKS
                    </span>
                    <div className="flex items-center gap-2.5 mt-0.5">
                      <span className="text-3xl font-extrabold text-slate-900 leading-none">
                        627
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-[#e6fbf2] text-[#00a862]">
                        +18% this month
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mini Bar Chart Graphic */}
                <div className="flex items-end gap-1.5 h-10 shrink-0 pr-1">
                  <div className="w-2 h-4 rounded-full bg-[#a7f3d0]" />
                  <div className="w-2 h-6 rounded-full bg-[#6ee7b7]" />
                  <div className="w-2 h-5 rounded-full bg-[#34d399]" />
                  <div className="w-2 h-8 rounded-full bg-[#10b981]" />
                  <div className="w-2 h-10 rounded-full bg-[#00c875]" />
                </div>
              </div>

              {/* Bottom Cards: Active Projects & Team Members */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Active Projects Card */}
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                    <svg className="w-4 h-4 text-[#00c875]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    <span>Active Projects</span>
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 mt-2">
                    32
                  </div>
                  <div className="text-xs font-semibold text-[#00a862] mt-1">
                    +12% this month
                  </div>
                </div>

                {/* Team Members Card */}
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                    <Users className="w-4 h-4 text-[#00c875]" />
                    <span>Team Members</span>
                  </div>
                  <div className="flex items-end justify-between mt-2">
                    <span className="text-3xl font-extrabold text-slate-900">
                      58
                    </span>
                    <div className="flex items-center -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-[#f59e0b] text-white text-xs font-bold flex items-center justify-center ring-2 ring-white">
                        A
                      </div>
                      <div className="w-7 h-7 rounded-full bg-[#0d9488] text-white text-xs font-bold flex items-center justify-center ring-2 ring-white">
                        S
                      </div>
                      <div className="w-7 h-7 rounded-full bg-[#00c875] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                        DK
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Compliance Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <svg className="w-4 h-4 text-[#00c875] shrink-0" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#00c875" />
                  <path d="m8 12 3 3 5-5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>SOC2 Type II Certified</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <svg className="w-4 h-4 text-[#00c875] shrink-0" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#00c875" />
                  <path d="m8 12 3 3 5-5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>256-bit SSL Encryption</span>
              </div>
            </div>
          </div>

          {/* Right Column: Elevated Login Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[480px] bg-white rounded-[32px] p-8 sm:p-10 shadow-2xl shadow-slate-200/70 border border-slate-100 relative">
              {userSession ? (
                /* Authenticated State */
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#e6fbf2] text-[#00c875] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Signed In Successfully</h3>
                  <p className="text-sm text-slate-500">
                    Logged in as <span className="font-semibold text-slate-800">{userSession.email}</span>
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={handleLogout}
                      className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                /* Login Form Component */
                <LoginForm onLoginSuccess={handleLoginSuccess} />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
