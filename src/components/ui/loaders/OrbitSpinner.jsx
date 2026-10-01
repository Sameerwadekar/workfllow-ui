import React from 'react';

/**
 * TaskFlow Signature Orbit Spinner
 * Counter-rotating glowing dual rings with emerald / mint accents.
 * 
 * @param {'sm' | 'md' | 'lg' | 'xl' | '2xl'} size
 * @param {string} className
 * @param {React.ReactNode} children Optional centered icon or element
 * @param {boolean} showCenterDot Default true when children is not provided
 */
export default function OrbitSpinner({
  size = 'md',
  className = '',
  children,
  showCenterDot = true,
  ariaLabel = 'Loading',
}) {
  const sizeMap = {
    sm: {
      container: 'w-[18px] h-[18px]',
      outerBorder: 'border-2',
      innerInset: 'inset-0.5',
      innerBorder: 'border',
      dot: 'w-1 h-1',
      glow: '',
    },
    md: {
      container: 'w-[28px] h-[28px]',
      outerBorder: 'border-2',
      innerInset: 'inset-1',
      innerBorder: 'border-2',
      dot: 'w-1.5 h-1.5',
      glow: 'shadow-[0_0_8px_#10b981]',
    },
    lg: {
      container: 'w-[44px] h-[44px]',
      outerBorder: 'border-[3px]',
      innerInset: 'inset-1.5',
      innerBorder: 'border-2',
      dot: 'w-2.5 h-2.5',
      glow: 'shadow-[0_0_10px_#10b981]',
    },
    xl: {
      container: 'w-[64px] h-[64px]',
      outerBorder: 'border-4',
      innerInset: 'inset-2',
      innerBorder: 'border-[3px]',
      dot: 'w-3.5 h-3.5',
      glow: 'shadow-[0_0_12px_#10b981]',
    },
    '2xl': {
      container: 'w-[80px] h-[80px]',
      outerBorder: 'border-4',
      innerInset: 'inset-2.5',
      innerBorder: 'border-[3px]',
      dot: 'w-4 h-4',
      glow: 'shadow-[0_0_14px_#10b981]',
    },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`relative flex items-center justify-center ${currentSize.container} ${className}`}
    >
      {/* Outer Orbit: Primary Emerald clockwise rotation */}
      <div
        className={`absolute inset-0 rounded-full ${currentSize.outerBorder} border-transparent border-t-[#006c49] border-r-[#10b981] animate-spin`}
      />

      {/* Inner Orbit: Luminous Mint counter-clockwise rotation */}
      <div
        className={`absolute ${currentSize.innerInset} rounded-full ${currentSize.innerBorder} border-transparent border-b-[#4edea3] border-l-[#82f5c1] animate-spin-reverse`}
      />

      {/* Centered Element or Glowing Nucleus */}
      {children ? (
        <div className="relative z-10 flex items-center justify-center">
          {children}
        </div>
      ) : showCenterDot ? (
        <div
          className={`rounded-full bg-[#006c49] ${currentSize.dot} ${currentSize.glow}`}
        />
      ) : null}
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
}
