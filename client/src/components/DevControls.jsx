import React, { useState } from 'react';
import { RefreshCw, Zap, Users, Smartphone, Monitor, CheckCircle, AlertCircle } from 'lucide-react';

export default function DevControls({
  viewMode,
  setViewMode,
  currentUser,
  setCurrentUser,
  onResetSpots,
  onTestConcurrency,
  isTestingConcurrency,
  competition,
  apiOnline
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside aria-label="Reviewer Controls" className="w-full bg-slate-900 border-b border-slate-800 text-white text-xs px-4 py-2.5 transition-all shadow-md z-50">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold tracking-wide text-teal-400 uppercase text-[11px]">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping inline-block"></span>
            <span>Feedants Technical Assignment Evaluator Bar</span>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
            {apiOnline ? (
              <>
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                <span>Backend Connected (Port 3000)</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3 text-amber-400" />
                <span>Local DB Active</span>
              </>
            )}
          </span>
        </div>

        {/* Center / Right: Interactive Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-medium ${
                viewMode === 'mobile'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Matches Page 3 PDF screenshot frame"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Frame (PDF Match)</span>
            </button>
            <button
              onClick={() => setViewMode('responsive')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-medium ${
                viewMode === 'responsive'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Expand into responsive full-width web layout"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Full Responsive Web</span>
            </button>
          </div>

          {/* User Switcher */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <span className="px-2 text-slate-400 text-[11px] flex items-center gap-1">
              <Users className="w-3 h-3" /> User:
            </span>
            <button
              onClick={() => setCurrentUser({ id: 'user_1', name: 'Riya Sharma (Registered)', email: 'riya@feedants.com' })}
              className={`px-2 py-1 rounded-md transition-all ${
                currentUser.id === 'user_1'
                  ? 'bg-teal-700 text-white font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              User 1 (Registered)
            </button>
            <button
              onClick={() => setCurrentUser({ id: 'user_2', name: 'Kavita Joshi (New Participant)', email: 'kavita@feedants.com' })}
              className={`px-2 py-1 rounded-md transition-all ${
                currentUser.id === 'user_2'
                  ? 'bg-teal-700 text-white font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              User 2 (Unregistered)
            </button>
          </div>

          {/* Concurrency Simulator */}
          <button
            onClick={onTestConcurrency}
            disabled={isTestingConcurrency || competition?.remainingSpots <= 0}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/40 text-amber-300 transition-all font-medium disabled:opacity-50"
            title="Simulate 5 rapid concurrent bookings to test backend atomic locking"
          >
            <Zap className={`w-3.5 h-3.5 ${isTestingConcurrency ? 'animate-bounce text-amber-400' : ''}`} />
            <span>{isTestingConcurrency ? 'Testing Concurrency...' : 'Test Concurrency (5 Users)'}</span>
          </button>

          {/* Reset Spots */}
          <button
            onClick={onResetSpots}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-all"
            title="Reset spots to 19 left (1/20 booked) as shown in PDF"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden md:inline">Reset State</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
