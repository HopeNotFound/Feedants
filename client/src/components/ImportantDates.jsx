import React from 'react';
import { Calendar, Send, UploadCloud, Trophy } from 'lucide-react';

export default function ImportantDates({ dates, language }) {
  const isHindi = language === 'hi';

  const defaultDates = dates || {
    registerBeforeDisplay: '10 Aug 26, 11:50 PM',
    submissionStartsDisplay: '11 Aug 26, 04:00 AM',
    submissionEndsDisplay: '20 Aug 26, 11:55 PM',
    resultDateDisplay: '1 Sept 26, 11:50 PM'
  };

  const items = [
    {
      id: 'reg',
      label: isHindi ? 'पंजीकरण अंतिम तिथि:' : 'Register Before:',
      value: defaultDates.registerBeforeDisplay || '10 Aug 26, 11:50 PM',
      icon: Calendar,
      color: 'text-teal-700 bg-teal-50'
    },
    {
      id: 'sub_start',
      label: isHindi ? 'प्रस्तुति प्रारंभ:' : 'Submission Starts:',
      value: defaultDates.submissionStartsDisplay || '11 Aug 26, 04:00 AM',
      icon: Send,
      color: 'text-teal-700 bg-teal-50'
    },
    {
      id: 'sub_end',
      label: isHindi ? 'प्रस्तुति समाप्ति:' : 'Submission Ends:',
      value: defaultDates.submissionEndsDisplay || '20 Aug 26, 11:55 PM',
      icon: UploadCloud,
      color: 'text-teal-700 bg-teal-50'
    },
    {
      id: 'result',
      label: isHindi ? 'परिणाम तिथि:' : 'Result Date:',
      value: defaultDates.resultDateDisplay || '1 Sept 26, 11:50 PM',
      icon: Trophy,
      color: 'text-teal-700 bg-teal-50'
    }
  ];

  return (
    <section className="px-4 my-3">
      <h2 className="text-[14px] font-bold text-gray-900 mb-2.5">
        {isHindi ? 'महत्वपूर्ण तिथियां' : 'Important Dates'}
      </h2>

      <div className="grid grid-cols-2 gap-2.5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-2.5 rounded-xl bg-white border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex items-start gap-2.5"
            >
              <div className={`p-1.5 rounded-lg shrink-0 ${item.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-gray-700 font-medium truncate">
                  {item.label}
                </span>
                <span className="text-[11px] font-bold text-gray-900 leading-tight mt-0.5">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
