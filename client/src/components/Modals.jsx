import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Film, Star, Upload, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export function RegistrationModal({
  isOpen,
  onClose,
  competition,
  currentUser,
  onConfirmRegistration,
  isSubmitting,
  language
}) {
  if (!isOpen) return null;

  const isHindi = language === 'hi';
  const [name, setName] = useState(currentUser?.name?.split('(')[0]?.trim() || 'Kavita Joshi');
  const [email, setEmail] = useState(currentUser?.email || 'kavita@feedants.com');

  const handlePay = async (e) => {
    e.preventDefault();
    await onConfirmRegistration({ name, email });
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
            ₹
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight">
              {isHindi ? 'पंजीकरण एवं भुगतान' : 'Complete Registration'}
            </h3>
            <span className="text-[11px] text-gray-400">Feedants Instant Checkout</span>
          </div>
        </div>

        <div className="bg-teal-50/60 rounded-xl p-3 border border-teal-100 mb-4">
          <div className="text-[11px] text-teal-800 font-semibold mb-1">
            {competition?.title || 'Feedants Classical Dance'}
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-600">{isHindi ? 'प्रवेश शुल्क' : 'Competition Entry Fee'}</span>
            <span className="font-extrabold text-gray-900 text-sm">₹ {competition?.entryFee || 99}</span>
          </div>
        </div>

        <form onSubmit={handlePay} className="space-y-3">
          <div>
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
              {isHindi ? 'प्रतिभागी का नाम' : 'Participant Name'}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              placeholder="e.g. Kavita Joshi"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
              {isHindi ? 'ईमेल पता' : 'Email Address'}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              placeholder="e.g. participant@gmail.com"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-[0.99] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>{isHindi ? 'भुगतान संसाधित हो रहा है...' : 'Processing Securely...'}</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isHindi ? `₹${competition?.entryFee || 99} का भुगतान करें` : `Pay ₹${competition?.entryFee || 99} & Register`}</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>256-bit encrypted • Powered by Razorpay</span>
        </div>
      </div>
    </div>
  );
}

export function SubmissionModal({
  isOpen,
  onClose,
  competition,
  currentUser,
  onSubmitEntry,
  existingSubmission,
  language
}) {
  if (!isOpen) return null;

  const isHindi = language === 'hi';
  const [title, setTitle] = useState(existingSubmission?.title || 'Classical Dance Performance');
  const [danceStyle, setDanceStyle] = useState(existingSubmission?.danceStyle || 'Kathak');
  const [videoUrl, setVideoUrl] = useState(existingSubmission?.videoUrl || 'https://youtu.be/sample_dance_recording');
  const [notes, setNotes] = useState(existingSubmission?.notes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(!!existingSubmission);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmitEntry({
      title,
      danceStyle,
      videoUrl,
      notes
    });
    setIsSubmitting(false);
    setSubmitted(true);
    confetti({ particleCount: 70, spread: 60 });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center">
            <Upload className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight">
              {isHindi ? 'प्रतियोगिता प्रस्तुति' : 'Upload Submission'}
            </h3>
            <span className="text-[11px] text-teal-600 font-medium">
              {isHindi ? 'पंजीकृत प्रतिभागी' : 'Registered Participant'}
            </span>
          </div>
        </div>

        {submitted ? (
          <div className="py-4 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm">
              {isHindi ? 'प्रस्तुति सफलतापूर्वक प्राप्त हुई!' : 'Submission Received!'}
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed px-2">
              {isHindi
                ? 'आपकी शास्त्रीय नृत्य प्रस्तुति गुरु मंजू दुबे द्वारा मूल्यांकन के लिए दर्ज कर ली गई है।'
                : 'Your dance recording has been queued for evaluation by Guru Manju Dubey.'}
            </p>
            <div className="bg-gray-50 p-2.5 rounded-xl text-left text-xs border border-gray-100 space-y-1">
              <div><strong className="text-gray-700">Style:</strong> {danceStyle}</div>
              <div><strong className="text-gray-700">Title:</strong> {title}</div>
              <div className="truncate"><strong className="text-gray-700">Link:</strong> {videoUrl}</div>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs"
            >
              {isHindi ? 'बंद करें' : 'Done'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                {isHindi ? 'प्रस्तुति का शीर्षक' : 'Performance Title'}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Kathak Thumri - Krishna Vandana"
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                {isHindi ? 'शास्त्रीय नृत्य शैली' : 'Classical Dance Style'}
              </label>
              <select
                value={danceStyle}
                onChange={(e) => setDanceStyle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white"
              >
                <option value="Kathak">Kathak</option>
                <option value="Bharatanatyam">Bharatanatyam</option>
                <option value="Odissi">Odissi</option>
                <option value="Kuchipudi">Kuchipudi</option>
                <option value="Kathakali">Kathakali</option>
                <option value="Mohiniyattam">Mohiniyattam</option>
                <option value="Manipuri">Manipuri</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                {isHindi ? 'वीडियो लिंक (YouTube / Drive)' : 'Video Recording URL (YouTube / Drive)'}
              </label>
              <input
                type="url"
                required
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtu.be/... or Google Drive link"
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                {isHindi ? 'टिप्पणी / विवरण (वैकल्पिक)' : 'Notes for Judges (Optional)'}
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention Taal, Raga, or Guru details..."
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
            >
              {isSubmitting ? (isHindi ? 'अपलोड हो रहा है...' : 'Submitting Entry...') : (isHindi ? 'प्रस्तुति जमा करें' : 'Submit Entry')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function VideoModal({ isOpen, onClose, title, videoType }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-teal-600" />
            <span className="font-bold text-gray-900 text-xs">{title}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-gray-100 text-gray-500 hover:text-gray-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="aspect-video bg-black flex items-center justify-center">
          <iframe
            className="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/5qap5aO4i9A?autoplay=1"
            title="Feedants Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="p-3 text-[11px] text-gray-500 bg-gray-50">
          Feedants verified video streaming platform.
        </div>
      </div>
    </div>
  );
}

export function TestimonialsModal({ isOpen, onClose, testimonials, language }) {
  if (!isOpen) return null;
  const isHindi = language === 'hi';

  const defaultList = testimonials || [
    {
      name: 'Sneha Kapoor',
      style: 'Kathak Winner (Edition 4)',
      comment: 'The detailed remarks by Guru Manju Dubey on my footwork helped me refine my craft tremendously. Prize money was transferred to UPI within 24 hours!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Rohit Deshmukh',
      style: 'Bharatanatyam Finalist',
      comment: 'Amazing transparent judging system. Feedants gave me nationwide visibility that opened doors for stage festivals.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Ananya Nair',
      style: 'Mohiniyattam Performer',
      comment: 'Super easy registration and upload experience. The certificates are authenticated and recognized by cultural academies.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-gray-100 relative max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="font-bold text-gray-900 text-base mb-1">
          {isHindi ? 'प्रतिभागियों की समीक्षाएं' : 'Hear From Our Users'}
        </h3>
        <p className="text-[11px] text-gray-400 mb-4">
          {isHindi ? 'विजेताओं और प्रतिभागियों के वास्तविक अनुभव' : 'Verified reviews from past competition participants'}
        </p>

        <div className="space-y-3">
          {defaultList.map((item, index) => (
            <div key={index} className="p-3 rounded-2xl bg-gray-50/80 border border-gray-100 space-y-1.5">
              <div className="flex items-center gap-2.5">
                <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-gray-900 text-xs leading-none">{item.name}</h4>
                  <span className="text-[10px] text-teal-600 font-medium">{item.style}</span>
                </div>
              </div>
              <div className="flex text-amber-400 text-xs">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                ))}
              </div>
              <p className="text-[11.5px] text-gray-600 leading-relaxed italic">
                "{item.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
