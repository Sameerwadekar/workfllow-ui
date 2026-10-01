import React from 'react';

/**
 * TaskFlow Indeterminate Progress Track
 * Continuous horizontal kinetic emerald beam for async data transitions.
 * 
 * @param {'sm' | 'md'} height
 * @param {string} className
 */
export default function IndeterminateTrack({
  height = 'sm',
  className = '',
  ariaLabel = 'In progress',
}) {
  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    xs: 'h-1',
  };

  const selectedHeight = heightClasses[height] || heightClasses.sm;

  return (
    <div
      role="progressbar"
      aria-label={ariaLabel}
      className={`w-full ${selectedHeight} bg-slate-100 rounded-full overflow-hidden relative ${className}`}
    >
      <div className="absolute top-0 bottom-0 bg-gradient-to-r from-transparent via-[#10b981] to-transparent w-1/2 rounded-full animate-shimmer-beam" />
    </div>
  );
}
