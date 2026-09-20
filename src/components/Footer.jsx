import React from 'react';

export default function Footer() {
  return (
    <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
      <div>
        © 2026 TaskFlow Inc. All rights reserved.
      </div>

      <div className="flex items-center space-x-6">
        <a
          href="#help"
          onClick={(e) => e.preventDefault()}
          className="hover:text-slate-600 transition-colors"
        >
          Help & Support
        </a>
        <a
          href="#status"
          onClick={(e) => e.preventDefault()}
          className="hover:text-slate-600 transition-colors"
        >
          System Status
        </a>
        <a
          href="#mobile"
          onClick={(e) => e.preventDefault()}
          className="hover:text-slate-600 transition-colors"
        >
          Mobile App
        </a>
      </div>
    </footer>
  );
}
