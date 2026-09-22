import React from 'react';
import { DASHBOARD_DATA } from '../../data/dashboardData';

export default function AnalyticsChart() {
  const { analyticsOverview } = DASHBOARD_DATA;

  // Chart coordinates mapping (normalized to SVG coordinate system)
  // X: 7 points from day 0 to day 6
  // Points: Sat(45), Sun(110), Mon(175), Tue(240), Wed(305), Thu(370), Fri(435)
  // Height: 200 (Y=0 is top 100%, Y=200 is bottom 0%)
  const points = [
    { x: 45, y: 110, barH: 95 },   // Sat
    { x: 110, y: 88, barH: 115 },  // Sun
    { x: 175, y: 112, barH: 80 },  // Mon
    { x: 240, y: 72, barH: 125 },  // Tue
    { x: 305, y: 64, barH: 60 },   // Wed
    { x: 370, y: 92, barH: 75 },   // Thu
    { x: 435, y: 125, barH: 90 }   // Fri
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100 flex flex-col justify-between h-full">
      {/* Chart Header */}
      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          {analyticsOverview.title}
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          {analyticsOverview.subtitle}
        </p>
      </div>

      {/* Interactive / Polished SVG Chart */}
      <div className="relative mt-6 w-full aspect-16/9 min-h-[220px]">
        {/* Y-Axis Labels */}
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[11px] font-mono text-slate-300 select-none">
          {analyticsOverview.yAxis.map((val) => (
            <span key={val}>{val}</span>
          ))}
        </div>

        {/* SVG Canvas for Grid, Bars, and Curved Area Wave */}
        <div className="ml-8 h-full flex flex-col justify-between">
          <svg
            viewBox="0 0 480 200"
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Wave Gradient Fill */}
              <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="60%" stopColor="#34d399" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>

              {/* Bar Linear Gradient */}
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Horizontal Gridlines */}
            {[0, 36, 72, 108, 144, 180].map((y, idx) => (
              <line
                key={idx}
                x1="0"
                y1={y}
                x2="480"
                y2={y}
                stroke="#f1f5f9"
                strokeWidth="1.2"
              />
            ))}

            {/* Vertical Soft Rounded Bars */}
            {points.map((pt, i) => (
              <rect
                key={i}
                x={pt.x - 7}
                y={180 - pt.barH}
                width="14"
                height={pt.barH}
                rx="7"
                fill="url(#barGradient)"
                className="hover:opacity-90 transition-opacity"
              />
            ))}

            {/* Smooth Curved Wave Area Fill */}
            <path
              d={`
                M 45 110
                C 75 90, 85 88, 110 88
                C 140 88, 150 115, 175 112
                C 205 110, 215 72, 240 72
                C 270 72, 280 64, 305 64
                C 335 64, 345 92, 370 92
                C 395 92, 410 125, 435 125
                L 435 180
                L 45 180
                Z
              `}
              fill="url(#waveGradient)"
            />

            {/* Smooth Emerald Wave Stroke Line */}
            <path
              d={`
                M 45 110
                C 75 90, 85 88, 110 88
                C 140 88, 150 115, 175 112
                C 205 110, 215 72, 240 72
                C 270 72, 280 64, 305 64
                C 335 64, 345 92, 370 92
                C 395 92, 410 125, 435 125
              `}
              fill="none"
              stroke="#00c875"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Accent Green Indicator Dots on Peaks */}
            <circle cx="110" cy="88" r="3.5" fill="#00c875" />
            <circle cx="175" cy="112" r="3" fill="#00c875" />
            <circle cx="240" cy="72" r="3.5" fill="#00c875" />
            <circle cx="305" cy="64" r="4" fill="#00c875" stroke="#ffffff" strokeWidth="2" />
            <circle cx="370" cy="92" r="3" fill="#00c875" />
          </svg>

          {/* X-Axis Days Labels */}
          <div className="flex justify-between px-3 pt-2 text-xs font-semibold text-slate-400 select-none">
            {analyticsOverview.data.map((item) => (
              <span key={item.day}>{item.day}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
