import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 animate-bounce duration-300">
      <div className={`px-4 py-2 rounded-full shadow-lg border flex items-center gap-2 text-xs font-semibold ${
        type === 'success'
          ? 'bg-emerald-900/90 text-white border-emerald-600 backdrop-blur-md'
          : 'bg-rose-900/90 text-white border-rose-600 backdrop-blur-md'
      }`}>
        {type === 'success' ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        ) : (
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
        )}
        <span>{message}</span>
      </div>
    </div>
  );
}
