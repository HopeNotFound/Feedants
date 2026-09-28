import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, Sliders } from 'lucide-react';

export default function CompetitionTabs({ competition, language }) {
  const isHindi = language === 'hi';
  const [activeTab, setActiveTab] = useState('about');
  const [isExpanded, setIsExpanded] = useState(false);

  const tabs = [
    { id: 'about', label: isHindi ? 'प्रतियोगिता के बारे में' : 'About Competition' },
    { id: 'judging', label: isHindi ? 'मूल्यांकन मानदंड' : 'Judging Parameters' },
    { id: 'rules', label: isHindi ? 'नियम एवं पात्रता' : 'Rules & Eligibility' }
  ];

  return (
    <section className="px-4 my-2">
      {/* Tabs Header */}
      <div className="flex items-center border-b border-gray-200 gap-4 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 text-[13px] font-semibold transition-all relative whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-teal-800 font-bold'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-700 rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-3 text-[12px] text-gray-600 leading-relaxed">
        {/* Tab 1: About Competition */}
        {activeTab === 'about' && (
          <div>
            <p className="text-gray-600">
              {isHindi
                ? 'यह सभी आयु वर्गों के लिए एक ऑनलाइन शास्त्रीय नृत्य प्रतियोगिता है। भारतनाट्यम, कथक, ओडिसी, कुचिपुड़ी या कथकली में अपनी प्रतिभा का प्रदर्शन करें। कहीं से भी भाग लें और अपनी प्रतिभा का प्रदर्शन करें।'
                : competition?.description || 'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent. Express your passion through traditional dance.'}
            </p>

            {isExpanded && (
              <p className="mt-2 text-gray-600 animate-fadeIn">
                {isHindi
                  ? 'यह मंच शास्त्रीय नर्तकों को राष्ट्रीय स्तर पर अपनी कला प्रस्तुत करने का अवसर प्रदान करता है। प्रत्येक प्रतियोगी को प्रतिष्ठित गुरुओं द्वारा निष्पक्ष मूल्यांकन और फीडबैक प्राप्त होगा। सभी प्रतिभागियों को डिजिटल प्रमाणपत्र एवं विजेताओं को नकद पुरस्कार से सम्मानित किया जाएगा।'
                  : 'Feedants provides a stage for classical performers to reach a pan-India and global audience. Submissions will be assessed on technique, rhythm, abhinaya, and visual presentation. All participants receive verified certificates, and top performers win cash awards credited directly.'}
              </p>
            )}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-teal-700 font-bold text-[11px] mt-2 hover:underline focus:outline-none"
            >
              <span>{isExpanded ? (isHindi ? 'कम देखें' : 'View less') : (isHindi ? 'और देखें' : 'View more')}</span>
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        )}

        {/* Tab 2: Judging Parameters */}
        {activeTab === 'judging' && (
          <div className="space-y-2.5">
            {(competition?.judgingParameters || [
              { name: 'Taala & Rhythm Adherence', weight: '30%', description: 'Footwork precision and timing.' },
              { name: 'Bhava & Abhinaya', weight: '25%', description: 'Facial expressions and emotional depth.' },
              { name: 'Anga Shuddhi & Mudras', weight: '20%', description: 'Posture and clarity of hand gestures.' },
              { name: 'Costume & Presentation', weight: '15%', description: 'Authentic dance attire and aesthetics.' },
              { name: 'Originality & Choreography', weight: '10%', description: 'Transitions and creative flow.' }
            ]).map((param, idx) => (
              <div key={idx} className="bg-white p-2.5 rounded-xl border border-gray-100 flex items-start justify-between gap-3 shadow-2xs">
                <div>
                  <h3 className="font-bold text-gray-900 text-[12px]">{param.name}</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">{param.description}</p>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 font-bold text-[11px] shrink-0 border border-teal-100">
                  {param.weight}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Rules & Eligibility */}
        {activeTab === 'rules' && (
          <div className="space-y-2">
            {(competition?.rules || [
              'Performance video duration must be between 2 to 5 minutes.',
              'Video must be recorded in landscape orientation (720p or 1080p).',
              'Audible music track without distracting background noise.',
              'No cuts, filters, or video speed alterations during the performance.',
              'Briefly introduce your name and dance style at the beginning.',
              'Open to all age categories globally.'
            ]).map((rule, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-white p-2 rounded-lg border border-gray-100 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                <span className="text-[11.5px] text-gray-700 leading-snug">{rule}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
