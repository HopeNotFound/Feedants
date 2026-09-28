import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';

export default function PreviousWinners({ winners, language }) {
  const isHindi = language === 'hi';

  const defaultWinners = [
    {
      id: 'w1',
      name: 'Riya Shah',
      rank: 1,
      style: 'Kathak',
      badge: '1st Place',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      badgeColor: 'bg-amber-400 text-amber-900 border-amber-300 ring-amber-300'
    },
    {
      id: 'w2',
      name: 'Aarav Mehta',
      rank: 2,
      style: 'Bharatanatyam',
      badge: '2nd Place',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      badgeColor: 'bg-slate-300 text-slate-800 border-slate-200 ring-slate-300'
    },
    {
      id: 'w3',
      name: 'Neha Verma',
      rank: 3,
      style: 'Odissi',
      badge: '3rd Place',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'w4',
      name: 'Ishita C',
      rank: 4,
      style: 'Kuchipudi',
      badge: 'Finalist',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80'
    }
  ];

  const winnerList = winners && winners.length > 0 ? winners : defaultWinners;

  return (
    <section className="px-4 my-3">
      <h2 className="text-[14px] font-bold text-gray-900 mb-2.5">
        {isHindi ? 'पिछले विजेता' : 'Previous Winners'}
      </h2>

      {/* Horizontal scrolling row matching the circular avatars with badges */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
        {winnerList.map((winner, index) => {
          return (
            <div
              key={winner.id || index}
              className="flex flex-col items-center shrink-0 w-[72px]"
            >
              {/* Avatar with rank medal badge overlay */}
              <div className="relative">
                <img
                  src={winner.avatar}
                  alt={winner.name}
                  className={`w-14 h-14 rounded-full object-cover ring-2 ${
                    winner.rank === 1
                      ? 'ring-amber-400'
                      : winner.rank === 2
                      ? 'ring-slate-300'
                      : winner.rank === 3
                      ? 'ring-amber-600'
                      : 'ring-teal-400'
                  }`}
                />
                {/* Badge Overlay */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center w-5 h-5 rounded-full bg-white shadow-xs border border-gray-100">
                  {winner.rank === 1 ? (
                    <Trophy className="w-3 h-3 text-amber-500 fill-amber-400" />
                  ) : winner.rank === 2 ? (
                    <Medal className="w-3 h-3 text-slate-500 fill-slate-300" />
                  ) : (
                    <Award className="w-3 h-3 text-amber-700" />
                  )}
                </div>
              </div>

              {/* Name & Subtitle */}
              <span className="text-[11px] font-semibold text-gray-800 text-center mt-2 truncate w-full">
                {winner.name}
              </span>
              <span className="text-[9px] text-gray-400 text-center truncate w-full">
                {winner.style || (winner.rank === 1 ? 'Kathak' : 'Dance')}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
