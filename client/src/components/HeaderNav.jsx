import React from 'react';
import { ArrowLeft, Check, Wifi, BatteryCharging, Signal } from 'lucide-react';

export default function HeaderNav({
  language,
  setLanguage,
  isRegistered,
  onBackClick,
  onRegisterClick
}) {
  const isHindi = language === 'hi';

  return (
    <div className="sticky top-0 bg-white z-40 border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      {/* Mobile Top Status Bar Simulation */}
      <div className="flex items-center justify-between px-6 pt-2 pb-1 text-xs text-gray-800 font-semibold select-none">
        <span className="tracking-tight text-sm font-bold">9:41</span>
        <div className="flex items-center gap-1.5 text-gray-700">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <div className="w-5 h-2.5 border border-gray-700 rounded-sm p-0.5 flex items-center">
            <div className="w-full h-full bg-gray-800 rounded-2xs"></div>
          </div>
        </div>
      </div>

      {/* Main Top Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-2.5">
        {/* Back Button */}
        <button
          onClick={onBackClick}
          className="flex items-center gap-1.5 text-gray-800 hover:text-gray-900 transition-colors font-medium text-sm group"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 text-gray-700 group-hover:-translate-x-0.5 transition-transform" />
          <span className="font-semibold text-[14px]">
            {isHindi ? 'वापस जाएं' : 'Go back'}
          </span>
        </button>

        {/* Right Actions: Language Switcher & Registration Status Pill */}
        <div className="flex items-center gap-2">
          {/* Language Toggle: ENG | हिंदी */}
          <div className="flex items-center bg-teal-800 text-white rounded-full px-2 py-0.5 text-xs font-semibold shadow-xs">
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded-full transition-all text-[11px] ${
                language === 'en'
                  ? 'bg-teal-600 text-white shadow-xs font-bold'
                  : 'text-teal-200 hover:text-white'
              }`}
            >
              ENG
            </button>
            <span className="text-teal-400 text-[10px] mx-0.5">|</span>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-1.5 py-0.5 rounded-full transition-all text-[11px] ${
                language === 'hi'
                  ? 'bg-teal-600 text-white shadow-xs font-bold'
                  : 'text-teal-200 hover:text-white'
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* Registration Status Pill */}
          {isRegistered ? (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold shadow-xs">
              <Check className="w-3 h-3 text-teal-600 stroke-[3]" />
              <span className="text-[12px]">{isHindi ? 'पंजीकृत' : 'Registered'}</span>
            </div>
          ) : (
            <button
              onClick={onRegisterClick}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium transition-colors shadow-xs"
            >
              <span>{isHindi ? 'पंजीकरण करें' : 'Register Now'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
