import React, { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';

export default function ReferAndEarn({ referral, onShowToast, language }) {
  const isHindi = language === 'hi';
  const [copied, setCopied] = useState(false);

  const referUrl = referral?.url || 'https://feedants.com/c/classicd22';

  const handleCopy = () => {
    navigator.clipboard.writeText(referUrl);
    setCopied(true);
    if (onShowToast) {
      onShowToast(isHindi ? 'रेफरल लिंक कॉपी हो गया!' : 'Referral link copied to clipboard!');
    }
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Feedants Classical Dance Competition',
        text: 'Join Feedants Classical Dance Competition and win exciting prizes!',
        url: referUrl
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <section className="px-4 my-3">
      <div className="p-3 rounded-2xl bg-teal-50/60 border border-teal-100 flex flex-col gap-2.5 shadow-2xs">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center">
              <Share2 className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-[12.5px] font-bold text-gray-900">
              {isHindi ? 'रेफर करें और छूट पाएं' : 'Refer & Earn more discount'}
            </h2>
          </div>

          <button
            onClick={handleShare}
            className="px-3 py-1 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-[11px] transition-colors shadow-2xs flex flex-col items-center"
          >
            <span>{isHindi ? 'अभी रेफर करें' : 'Refer Now'}</span>
            <span className="text-[8.5px] text-teal-100 font-normal">
              {isHindi ? 'प्रत्येक पर ₹50 पाएं' : 'Earn ₹50 for every express'}
            </span>
          </button>
        </div>

        {/* Input box with Copy Link button */}
        <div className="flex items-center bg-white rounded-xl border border-teal-200 overflow-hidden p-1 shadow-2xs">
          <input
            type="text"
            readOnly
            value={referUrl}
            className="flex-1 bg-transparent px-2.5 text-[11px] text-gray-600 focus:outline-none select-all"
          />
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-[11px] font-bold transition-colors shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-teal-700" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (isHindi ? 'कॉपी हुआ' : 'Copied') : (isHindi ? 'लिंक कॉपी करें' : 'Copy Link')}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
