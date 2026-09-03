import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';
import { ShieldCheck, Layers, Sparkles, CheckCircle, Lock, Users } from 'lucide-react';

export default function Login() {
  const [userSession, setUserSession] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUserSession(userData);
  };

  const handleLogout = () => {
    setUserSession(null);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans antialiased">
      {/* Background Decorative Blur Glowing Circles */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            WorkFlow
          </span>
          <span className="px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            v2.4 RBAC
          </span>
        </div>

        <div className="flex items-center space-x-4 text-xs font-medium text-slate-400">
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>256-Bit SSL Encrypted</span>
          </span>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Hero Branding & Features Info */}
          <div className="lg:col-span-6 space-y-6 text-left hidden lg:block">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-indigo-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enterprise Identity & Access Governance</span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Secure access to your <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
                WorkFlow Workspace
              </span>
            </h1>

            <p className="text-base text-slate-400 max-w-md leading-relaxed">
              Seamless role-based authorization, granular access controls, and real-time team collaboration built for modern engineering teams.
            </p>

            {/* Feature Bullet Points */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start space-x-3 text-slate-300 text-sm">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <span>Role-Based Access Control (RBAC) with AuthService backend</span>
              </div>
              <div className="flex items-start space-x-3 text-slate-300 text-sm">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Lock className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <span>Single Sign-On (SSO) & Multi-Factor Security</span>
              </div>
              <div className="flex items-start space-x-3 text-slate-300 text-sm">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <span>Centralized user identity management dashboard</span>
              </div>
            </div>
          </div>

          {/* Right Column: Login Component Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-indigo-950/40 relative">
              
              {userSession ? (
                /* Session Active Banner */
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Signed In Successfully</h3>
                  <p className="text-sm text-slate-400">
                    Logged in as <span className="font-semibold text-indigo-400">{userSession.email}</span>
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={handleLogout}
                      className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-all cursor-pointer"
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

      {/* Reusable Footer Component */}
      <Footer />
    </div>
  );
}


