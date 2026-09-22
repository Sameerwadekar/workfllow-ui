import React, { useState, useEffect } from 'react';
import { Smartphone, Play, Pause } from 'lucide-react';
import { DASHBOARD_DATA } from '../../data/dashboardData';

export default function BottomCards() {
  const { sprintProgress, timeTracking } = DASHBOARD_DATA;

  // Real-time ticking stopwatch for Time Tracking
  const [seconds, setSeconds] = useState(timeTracking.initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTimer = (totalSecs) => {
    const hrs = String(Math.floor(totalSecs / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSecs % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSecs % 60).padStart(2, '0');
    return `${hrs} : ${mins} : ${secs}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      {/* 1. Work Anywhere Banner (Emerald Card) */}
      <div className="lg:col-span-4 bg-[#00c875] rounded-3xl p-6 text-white flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-md transition">
        {/* Subtle decorative background watermarks */}
        <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-32 h-32 bg-emerald-400/30 rounded-full blur-lg pointer-events-none" />

        <div className="relative z-10">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center mb-4">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white leading-tight">
            Work Anywhere
          </h3>
          <p className="text-xs text-white/90 mt-1.5 leading-relaxed max-w-[220px]">
            Download our mobile app to manage your tasks on the go
          </p>
        </div>

        <div className="relative z-10 mt-6">
          <button
            type="button"
            onClick={() => alert('Mobile app download link triggered.')}
            className="px-4 py-2 rounded-xl bg-white text-[#00a862] text-xs font-bold shadow-xs hover:bg-slate-50 active:scale-98 transition cursor-pointer"
          >
            Get App
          </button>
        </div>
      </div>

      {/* 2. Sprint Progress (Gauge Rings Card) */}
      <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-xs border border-slate-100 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            {sprintProgress.title}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {sprintProgress.subtitle}
          </p>
        </div>

        {/* Semi-circular Ring Visuals */}
        <div className="grid grid-cols-2 gap-4 my-auto pt-4">
          {/* Gauge 1: In Progress */}
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-14 overflow-hidden flex items-end justify-center">
              <svg viewBox="0 0 100 50" className="w-full h-full">
                {/* Background arc */}
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                {/* Progress arc (42%) */}
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="10"
                  strokeDasharray="125.6"
                  strokeDashoffset="72.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-xs font-semibold text-slate-700 mt-2">
              In Progress
            </span>
            <span className="text-[11px] font-bold text-indigo-600">
              {sprintProgress.inProgressPercent}%
            </span>
          </div>

          {/* Gauge 2: Completed */}
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-14 overflow-hidden flex items-end justify-center">
              <svg viewBox="0 0 100 50" className="w-full h-full">
                {/* Background arc */}
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                {/* Progress arc (78%) */}
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#00c875"
                  strokeWidth="10"
                  strokeDasharray="125.6"
                  strokeDashoffset="27.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-xs font-semibold text-slate-700 mt-2">
              Completed
            </span>
            <span className="text-[11px] font-bold text-[#00c875]">
              {sprintProgress.completedPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* 3. Time Tracking (Digital Timer Card) */}
      <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-xs border border-slate-100 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              {timeTracking.title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {timeTracking.subtitle}
            </p>
          </div>
          <button
            type="button"
            aria-label={isRunning ? 'Pause timer' : 'Start timer'}
            onClick={() => setIsRunning(!isRunning)}
            className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition cursor-pointer"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>
        </div>

        {/* Large Monospace Timer Display */}
        <div className="my-auto py-4 text-center">
          <div className="text-3xl sm:text-[34px] font-mono font-black tracking-widest text-slate-900 select-none">
            {formatTimer(seconds)}
          </div>
          <div className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase mt-1">
            {isRunning ? 'Recording active sprint session' : 'Timer paused'}
          </div>
        </div>
      </div>
    </div>
  );
}
