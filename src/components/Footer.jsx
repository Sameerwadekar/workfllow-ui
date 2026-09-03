import React from 'react';

export default function Footer({ appName = 'WorkFlow Identity Systems' }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 border-t border-slate-900 gap-3">
      <div className="flex items-center space-x-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <p>© {currentYear} {appName}. All rights reserved.</p>
      </div>

      <div className="flex items-center space-x-6">
        <a
          href="#privacy"
          onClick={(e) => e.preventDefault()}
          className="hover:text-slate-300 transition-colors"
        >
          Privacy Policy
        </a>
        <a
          href="#terms"
          onClick={(e) => e.preventDefault()}
          className="hover:text-slate-300 transition-colors"
        >
          Terms of Service
        </a>
        <a
          href="#security"
          onClick={(e) => e.preventDefault()}
          className="hover:text-slate-300 transition-colors"
        >
          Security Overview
        </a>
      </div>
    </footer>
  );
}
