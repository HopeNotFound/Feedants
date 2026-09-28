import React, { useState, useEffect } from 'react';
import { Hourglass, Clock } from 'lucide-react';

export default function CountdownBanner({ targetDate, language }) {
  const isHindi = language === 'hi';

  // Default target time: 1 day, 6 hours, 28 minutes, 32 seconds from initial mount if no target
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 6,
    minutes: 28,
    seconds: 32
  });

  useEffect(() => {
    // If targetDate is provided, calculate difference dynamically
    const destination = targetDate ? new Date(targetDate).getTime() : Date.now() + ((1 * 86400) + (6 * 3600) + (28 * 60) + 32) * 1000;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, destination - now);

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: d,
        hours: h,
        minutes: m,
        seconds: s
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="mx-4 my-2 px-3 py-2 rounded-xl bg-teal-50/70 border border-teal-100 flex items-center justify-between text-xs">
      {/* Left: Hourglass & Label */}
      <div className="flex items-center gap-1.5 text-gray-700 font-medium">
        <Hourglass className="w-3.5 h-3.5 text-teal-700 animate-spin" style={{ animationDuration: '6s' }} />
        <span className="text-[11px] text-gray-700 font-semibold">
          {isHindi ? 'पंजीकरण समाप्त होने में' : 'Registration closes in'}
        </span>
      </div>

      {/* Center: Countdown Time Pill */}
      <div className="px-2 py-0.5 rounded-md bg-teal-700 text-white font-mono font-bold text-[12px] tracking-wide shadow-2xs">
        {pad(timeLeft.days)}d : {pad(timeLeft.hours)}h : {pad(timeLeft.minutes)}m : {pad(timeLeft.seconds)}s
      </div>

      {/* Right: Hurry up badge */}
      <div className="flex items-center gap-1 text-teal-700 font-bold text-[11px] animate-pulse">
        <Clock className="w-3 h-3 text-teal-700" />
        <span>{isHindi ? 'जल्दी करें!' : 'Hurry up!'}</span>
      </div>
    </div>
  );
}
