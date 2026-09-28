import React from 'react';
import { Home, Search, Plus, Trophy, User, CheckCircle2 } from 'lucide-react';

export default function StickyBottomBar({
  isRegistered,
  competition,
  onUploadClick,
  onRegisterClick,
  language
}) {
  const isHindi = language === 'hi';
  const remaining = competition?.remainingSpots ?? 19;
  const isSoldOut = remaining <= 0;

  return (
    <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
      {/* Primary Action Button Bar */}
      <div className="px-4 pt-3 pb-2 flex flex-col items-center">
        {isRegistered ? (
          <div className="w-full flex flex-col items-center">
            <button
              onClick={onUploadClick}
              className="w-full py-3 rounded-xl bg-teal-800 hover:bg-teal-900 active:scale-[0.99] text-white font-bold text-[14px] shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
            >
              <span>{isHindi ? 'प्रस्तुति अपलोड करें' : 'Upload Submission'}</span>
            </button>
            <div className="flex items-center gap-1 mt-1 text-[10px] text-teal-800 font-bold">
              <CheckCircle2 className="w-3 h-3 text-teal-700" />
              <span>{isHindi ? 'पंजीकृत' : 'Registered'}</span>
            </div>
          </div>
        ) : isSoldOut ? (
          <div className="w-full flex flex-col items-center">
            <button
              disabled
              className="w-full py-3 rounded-xl bg-gray-300 text-gray-500 font-bold text-[14px] cursor-not-allowed shadow-none"
            >
              <span>{isHindi ? 'सभी स्थान भर चुके हैं (Sold Out)' : 'Sold Out - No Spots Left'}</span>
            </button>
            <span className="text-[10px] text-gray-400 mt-1">
              {isHindi ? 'अगले चरण की प्रतीक्षा करें' : 'Stay tuned for next edition'}
            </span>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <button
              onClick={onRegisterClick}
              className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 active:scale-[0.99] text-white font-bold text-[14px] shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
            >
              <span>{isHindi ? `अभी पंजीकरण करें • ₹${competition?.entryFee || 99}` : `Register Now • ₹${competition?.entryFee || 99}`}</span>
            </button>
            <span className="text-[10px] text-amber-800 font-bold mt-1">
              {isHindi ? `केवल ${remaining} स्थान शेष • तुरंत पुष्टि` : `Only ${remaining} spots left • Instant confirmation`}
            </span>
          </div>
        )}
      </div>

      {/* Bottom App Navigation matching the PDF footer bar */}
      <div className="flex items-center justify-around px-2 py-2 border-t border-gray-100 text-gray-500">
        {/* Home */}
        <button className="flex flex-col items-center justify-center p-1.5 text-gray-500 hover:text-teal-700 transition-colors">
          <Home className="w-5 h-5 stroke-[1.8]" />
        </button>

        {/* Search */}
        <button className="flex flex-col items-center justify-center p-1.5 text-gray-500 hover:text-teal-700 transition-colors">
          <Search className="w-5 h-5 stroke-[1.8]" />
        </button>

        {/* Center Add Button */}
        <button className="flex items-center justify-center w-10 h-10 -mt-2 rounded-full bg-teal-700 hover:bg-teal-800 text-white shadow-md transition-all active:scale-95">
          <Plus className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Competitions (Active) */}
        <button className="flex flex-col items-center justify-center p-1.5 text-teal-800 font-semibold relative">
          <Trophy className="w-5 h-5 stroke-[2.2] text-teal-800" />
          <span className="w-1 h-1 rounded-full bg-teal-800 absolute bottom-0.5"></span>
        </button>

        {/* Profile */}
        <button className="flex flex-col items-center justify-center p-1.5 text-gray-500 hover:text-teal-700 transition-colors">
          <User className="w-5 h-5 stroke-[1.8]" />
        </button>
      </div>
    </div>
  );
}
