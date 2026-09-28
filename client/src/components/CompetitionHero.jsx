import React from 'react';
import { Award, AlertTriangle } from 'lucide-react';

export default function CompetitionHero({ competition, language }) {
  const isHindi = language === 'hi';

  const booked = competition?.bookedSpots ?? 1;
  const total = competition?.totalSpots ?? 20;
  const remaining = competition?.remainingSpots ?? Math.max(0, total - booked);
  const percentBooked = Math.min(100, Math.round((booked / total) * 100));

  return (
    <section className="px-4 pt-3 pb-2">
      {/* Title */}
      <h1 className="text-[22px] font-bold text-gray-900 tracking-tight leading-tight mb-2">
        {isHindi ? 'फीडएंट्स शास्त्रीय नृत्य' : competition?.title || 'Feedants Classical Dance'}
      </h1>

      {/* Tags Row */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
        <span className="px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[11px] font-medium border border-gray-200">
          {isHindi ? 'नृत्य' : 'Dance'}
        </span>
        <span className="px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[11px] font-medium border border-gray-200">
          {isHindi ? 'बहु-विजेता' : 'Multi-Win'}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[11px] font-medium border border-gray-200">
          <Award className="w-3 h-3 text-amber-500" />
          <span>{isHindi ? 'विजेताओं को प्रमाणपत्र' : 'Winners get certificate'}</span>
        </span>
      </div>

      {/* Pricing & Spots Card Row */}
      <div className="grid grid-cols-3 gap-2 items-center bg-gray-50/70 p-2.5 rounded-xl border border-gray-100">
        {/* Prize Pool */}
        <div className="flex flex-col">
          <span className="text-[11px] text-gray-500 font-medium">
            {isHindi ? 'पुरस्कार राशि' : 'Prize Pool'}
          </span>
          <span className="text-[19px] font-extrabold text-gray-900 leading-tight">
            ₹ {competition?.prizePool?.toLocaleString('en-IN') || '1,500'}
          </span>
        </div>

        {/* Entry Fee */}
        <div className="flex flex-col pl-2 border-l border-gray-200">
          <span className="text-[11px] text-gray-500 font-medium">
            {isHindi ? 'प्रवेश शुल्क' : 'Entry Fee'}
          </span>
          <span className="text-[19px] font-extrabold text-gray-900 leading-tight">
            ₹ {competition?.entryFee || '99'}
          </span>
        </div>

        {/* Spots Left & Progress Bar */}
        <div className="flex flex-col pl-2 border-l border-gray-200 justify-center">
          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-800 leading-none mb-1">
            <AlertTriangle className="w-3 h-3 text-amber-700 shrink-0" />
            <span className="truncate">
              {remaining > 0
                ? isHindi
                  ? `केवल ${remaining} स्थान शेष`
                  : `Only ${remaining} spots left`
                : isHindi
                ? 'सभी स्थान भरे'
                : 'Sold Out!'}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mb-1">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                remaining <= 3 ? 'bg-rose-500' : 'bg-teal-600'
              }`}
              style={{ width: `${percentBooked}%` }}
            ></div>
          </div>

          {/* Booked Subtext */}
          <span className="text-[10px] text-gray-700 font-semibold self-start">
            {booked} / {total} {isHindi ? 'बुक किया गया' : 'Booked'}
          </span>
        </div>
      </div>
    </section>
  );
}
