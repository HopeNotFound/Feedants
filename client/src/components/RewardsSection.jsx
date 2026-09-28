import React from 'react';
import { Trophy, Medal, Star, Play, ShieldCheck, Info } from 'lucide-react';

export default function RewardsSection({ rewards, onWatchPrizeVideo, language }) {
  const isHindi = language === 'hi';

  const defaultRewards = [
    { rank: 1, title: isHindi ? 'प्रथम विजेता' : '1st Winner', amount: 550, badge: 'gold' },
    { rank: 2, title: isHindi ? 'द्वितीय विजेता' : '2nd Winner', amount: 300, badge: 'silver' },
    { rank: 3, title: isHindi ? 'तृतीय विजेता' : '3rd Winner', amount: 240, badge: 'bronze' },
    { rank: 4, title: isHindi ? 'चतुर्थ विजेता' : '4th Winner', amount: 200, badge: 'star' },
    { rank: 5, title: isHindi ? 'पंचम विजेता' : '5th Winner', amount: 130, badge: 'star' },
    { rank: 6, title: isHindi ? 'षष्ठम विजेता' : '6th Winner', amount: 80, badge: 'star' }
  ];

  const rewardList = rewards && rewards.length > 0 ? rewards : defaultRewards;

  return (
    <section className="px-4 my-3">
      {/* Section Header */}
      <h2 className="text-[14px] font-bold text-gray-900 mb-2">
        {isHindi ? 'पुरस्कार विवरण (सभी स्थान)' : 'Rewards (All Positions)'}
      </h2>

      {/* Rewards List */}
      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)] overflow-hidden">
        {rewardList.map((item, idx) => {
          return (
            <div
              key={idx}
              className="flex items-center justify-between px-3.5 py-2.5 hover:bg-gray-50/50 transition-colors"
            >
              {/* Left: Position with Badge Icon */}
              <div className="flex items-center gap-2.5">
                {item.rank === 1 ? (
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                    <Trophy className="w-3 h-3 text-amber-600 fill-amber-500" />
                  </div>
                ) : item.rank === 2 ? (
                  <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center">
                    <Medal className="w-3 h-3 text-slate-600 fill-slate-400" />
                  </div>
                ) : item.rank === 3 ? (
                  <div className="w-5 h-5 rounded-full bg-amber-200/60 flex items-center justify-center">
                    <Medal className="w-3 h-3 text-amber-800 fill-amber-700" />
                  </div>
                ) : (
                  <div className="w-5 h-5 flex items-center justify-center text-teal-600">
                    <Star className="w-3.5 h-3.5 fill-teal-600" />
                  </div>
                )}

                <span className="text-[12.5px] font-medium text-gray-800">
                  {item.title}
                </span>
              </div>

              {/* Right: Cash Amount */}
              <span className="text-[13.5px] font-bold text-gray-900">
                ₹ {item.amount}
              </span>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-1.5 mt-2.5 px-1 text-[10px] text-gray-700 leading-tight">
        <Info className="w-3 h-3 text-gray-700 shrink-0 mt-0.5" />
        <p>
          {isHindi
            ? 'अस्वीकरण: केवल भुगतान करने वाले प्रतिभागियों के वीडियो पर ही निर्णायकों द्वारा विचार किया जाएगा।'
            : 'Disclaimer: Only contributions from paid participants will be considered for judging.'}
        </p>
      </div>

      {/* Action Links & Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
        {/* Prize Money Video Button */}
        <button
          onClick={onWatchPrizeVideo}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-100 text-teal-900 transition-colors text-left group"
        >
          <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <Play className="w-3 h-3 fill-white ml-0.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold leading-tight">
              {isHindi ? 'पुरस्कार राशि कैसे प्राप्त होगी?' : 'How will you receive prize money?'}
            </span>
            <span className="text-[9.5px] text-teal-700">
              {isHindi ? '(समझने के लिए वीडियो देखें)' : '(Watch video to understand)'}
            </span>
          </div>
        </button>

        {/* Razorpay Trust Badge */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-gray-50 border border-gray-100 text-gray-600">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-gray-700">
                {isHindi ? 'वापसी नीति' : 'Refund policy'}
              </span>
              <span className="text-[9px] text-gray-400">
                Secure payments powered by <strong className="text-blue-700 font-bold">Razorpay</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
