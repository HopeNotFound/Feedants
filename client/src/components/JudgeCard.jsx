import React from 'react';
import { Play } from 'lucide-react';

export default function JudgeCard({ judge, onWatchVideo, language }) {
  const isHindi = language === 'hi';

  const judgeData = judge || {
    name: 'Manju Dubey',
    title: 'Professional Kathak Dancer',
    experience: '12+ Years of Experience',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
  };

  return (
    <div className="mx-4 my-2.5 p-3 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-between">
      {/* Left: Avatar & Bio */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={judgeData.avatar}
            alt={judgeData.name}
            className="w-13 h-13 rounded-full object-cover border-2 border-teal-50 shadow-xs"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] text-gray-700 uppercase tracking-wider font-semibold">
            {isHindi ? 'निर्णायक' : 'Judge'}
          </span>
          <h2 className="text-[15px] font-bold text-gray-900 leading-tight">
            {judgeData.name}
          </h2>
          <p className="text-[11px] text-gray-500 font-medium">
            {judgeData.title}
          </p>
          <span className="text-[10px] text-teal-700 font-semibold mt-0.5">
            {judgeData.experience}
          </span>
        </div>
      </div>

      {/* Right: Intro Video Action */}
      <button
        onClick={onWatchVideo}
        className="flex flex-col items-center justify-center gap-1 group pl-2"
        aria-label="Watch Judge Intro Video"
      >
        <div className="w-9 h-9 rounded-full bg-teal-50 group-hover:bg-teal-100 flex items-center justify-center transition-colors border border-teal-100 shadow-2xs">
          <Play className="w-4 h-4 text-teal-700 fill-teal-700 ml-0.5 group-hover:scale-110 transition-transform" />
        </div>
        <span className="text-[10px] text-gray-600 font-semibold group-hover:text-teal-700 transition-colors">
          {isHindi ? 'परिचय वीडियो' : 'Intro Video'}
        </span>
      </button>
    </div>
  );
}
