import React from 'react';

/**
 * TaskFlow Flow Dots Wave / Pulse
 * Staggered rhythmic bounce for inline micro-loaders and status prompts.
 */
export default function FlowDotsWave({
  className = '',
  size = 'md',
  ariaLabel = 'Loading',
}) {
  const sizeMap = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
  };

  const dotSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <span
        className={`${dotSize} rounded-full bg-[#006c49] animate-bounce [animation-delay:-0.3s]`}
      />
      <span
        className={`${dotSize} rounded-full bg-[#10b981] animate-bounce [animation-delay:-0.15s]`}
      />
      <span
        className={`${dotSize} rounded-full bg-[#4edea3] animate-bounce`}
      />
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
}
