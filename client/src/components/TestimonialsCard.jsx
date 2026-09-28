import React from 'react';
import { MessageSquare, ChevronRight, Sparkles } from 'lucide-react';

export default function TestimonialsCard({ onOpenTestimonials, language }) {
  const isHindi = language === 'hi';

  return (
    <section className="px-4 my-3 space-y-3">
      {/* Testimonials Card */}
      <button
        onClick={onOpenTestimonials}
        className="w-full p-3 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-between text-left hover:border-teal-200 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-[12.5px] font-bold text-gray-900 group-hover:text-teal-800 transition-colors">
              {isHindi ? 'हमारे उपयोगकर्ताओं की राय' : 'Hear From Our Users'}
            </h2>
            <p className="text-[10px] text-gray-700 font-medium">
              {isHindi
                ? 'प्रतिभागियों की समीक्षाएं और अनुभव पढ़ें'
                : 'Read testimonials and reviews from participants'}
            </p>
          </div>
        </div>

        <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all shrink-0" />
      </button>

      {/* Ad / Notice Banner as shown in PDF screenshot */}
      <div className="w-full py-2 px-3 rounded-xl bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center gap-1.5 text-gray-600 text-[10px] font-medium">
        <Sparkles className="w-3 h-3 text-amber-500" />
        <span>Ad Here • Feedants Premium Membership</span>
      </div>
    </section>
  );
}
