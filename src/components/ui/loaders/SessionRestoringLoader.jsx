import React from 'react';
import flowalertAppIcon from '../../../assets/icons/flowalert-app-icon.svg';
import IndeterminateTrack from './IndeterminateTrack';

/**
 * TaskFlow Session Restoration Fullscreen Loader
 * Aligned with TaskFlow Enterprise Design System:
 * - Counter-rotating dual orbit rings (Signature FlowSpin)
 * - Brand squircle app icon center
 * - Kinetic indeterminate shimmer beam
 * - Enterprise Gateway live telemetry status badge
 */
export default function SessionRestoringLoader({
  title = 'Synchronizing TaskFlow',
  subtitle = 'Verifying credentials and restoring workspace preferences...',
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#faf8ff] via-[#f1f5f9] to-[#eaedff]/40 font-['Plus_Jakarta_Sans',sans-serif] px-4 selection:bg-[#10b981]/20"
    >
      {/* Ambient background glow */}
      <div
        className="absolute w-96 h-96 rounded-full bg-[#10b981]/5 blur-3xl pointer-events-none -translate-y-8"
        aria-hidden="true"
      />

      {/* Floating Card */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08),0_1px_3px_rgba(0,0,0,0.02)] border border-slate-100 max-w-sm w-full flex flex-col items-center text-center">
        {/* TaskFlow Orbit Spinner with Centered Brand Icon */}
        <div className="relative w-20 h-20 flex items-center justify-center mb-6">
          {/* Outer Orbit: Clockwise Deep Emerald */}
          <div
            className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#006c49] border-r-[#10b981] animate-spin"
            aria-hidden="true"
          />

          {/* Inner Orbit: Counter-Clockwise Mint */}
          <div
            className="absolute inset-2 rounded-full border-2 border-transparent border-b-[#4edea3] border-l-[#82f5c1] animate-spin-reverse"
            aria-hidden="true"
          />

          {/* Center Brand Icon */}
          <div className="relative z-10 w-11 h-11 rounded-2xl bg-gradient-to-br from-[#006c49] to-[#10b981] p-2 flex items-center justify-center shadow-md shadow-emerald-600/20">
            <img
              src={flowalertAppIcon}
              alt="TaskFlow"
              className="w-full h-full object-contain filter drop-shadow-sm"
            />
          </div>
        </div>

        {/* Heading & Subtitle */}
        <h2 className="text-xl font-bold text-[#131b2e] tracking-tight">
          {title}
        </h2>
        <p className="text-xs text-[#6c7a71] mt-1.5 max-w-[240px] leading-relaxed">
          {subtitle}
        </p>

        {/* Indeterminate Kinetic Beam Track */}
        <div className="w-52 mt-6">
          <IndeterminateTrack height="sm" ariaLabel="Restoring workspace state" />
        </div>

        {/* Live Telemetry / Gateway Connection Pill */}
        <div className="mt-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f2f3ff] border border-[#eaedff] text-[11px] font-semibold text-[#3c4a42]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006c49]" />
          </span>
          <span>Connected to Enterprise Gateway</span>
        </div>
      </div>
    </div>
  );
}
