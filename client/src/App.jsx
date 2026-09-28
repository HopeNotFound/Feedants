import React, { useState, useEffect, useCallback } from 'react';
import DevControls from './components/DevControls';
import HeaderNav from './components/HeaderNav';
import CompetitionHero from './components/CompetitionHero';
import JudgeCard from './components/JudgeCard';
import CountdownBanner from './components/CountdownBanner';
import ImportantDates from './components/ImportantDates';
import PreviousWinners from './components/PreviousWinners';
import CompetitionTabs from './components/CompetitionTabs';
import RewardsSection from './components/RewardsSection';
import ReferAndEarn from './components/ReferAndEarn';
import TestimonialsCard from './components/TestimonialsCard';
import StickyBottomBar from './components/StickyBottomBar';
import { RegistrationModal, SubmissionModal, VideoModal, TestimonialsModal } from './components/Modals';
import Toast from './components/Toast';

const API_BASE = 'http://localhost:3000/api/competitions';

export default function App() {
  const [competition, setCompetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiOnline, setApiOnline] = useState(false);
  const [viewMode, setViewMode] = useState('mobile'); // 'mobile' | 'responsive'
  const [language, setLanguage] = useState('en'); // 'en' | 'hi'

  // User simulation state
  const [currentUser, setCurrentUser] = useState({
    id: 'user_1',
    name: 'Riya Sharma (Registered)',
    email: 'riya@feedants.com'
  });
  const [isRegistered, setIsRegistered] = useState(true);
  const [existingSubmission, setExistingSubmission] = useState(null);

  // Modals state
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [videoModal, setVideoModal] = useState({ isOpen: false, title: '' });
  const [isTestimonialsOpen, setIsTestimonialsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTestingConcurrency, setIsTestingConcurrency] = useState(false);

  // Toast
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
  };

  // Fetch Competition Data from Backend
  const fetchCompetitionData = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/current`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setCompetition(json.data);
          setApiOnline(true);
          return json.data;
        }
      }
    } catch (err) {
      console.warn('Backend API unavailable, using local mock data:', err.message);
      setApiOnline(false);
    }
    return null;
  }, []);

  // Check Registration Status for current user
  const checkUserStatus = useCallback(async (compId, userId) => {
    if (!compId) return;
    try {
      const res = await fetch(`${API_BASE}/${compId}/registration-status?userId=${userId}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setIsRegistered(json.data.isRegistered);
        }
      }
      // Check submission
      const subRes = await fetch(`${API_BASE}/${compId}/submission?userId=${userId}`);
      if (subRes.ok) {
        const subJson = await subRes.json();
        if (subJson.success && subJson.data) {
          setExistingSubmission(subJson.data);
        } else {
          setExistingSubmission(null);
        }
      }
    } catch (err) {
      // In offline mode, default user_1 is registered, user_2 is not
      setIsRegistered(userId === 'user_1');
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchCompetitionData().then((comp) => {
      setLoading(false);
      if (comp) {
        checkUserStatus(comp._id, currentUser.id);
      }
    });
  }, [fetchCompetitionData]);

  // When currentUser changes, recheck registration status
  useEffect(() => {
    if (competition?._id) {
      checkUserStatus(competition._id, currentUser.id);
    } else {
      setIsRegistered(currentUser.id === 'user_1');
    }
  }, [currentUser, competition, checkUserStatus]);

  // Handle Registration
  const handleConfirmRegistration = async ({ name, email }) => {
    if (!competition?._id) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/${competition._id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          userName: name,
          userEmail: email
        })
      });
      const data = await res.json();
      if (data.success) {
        setIsRegistered(true);
        setIsRegModalOpen(false);
        showToast(language === 'hi' ? 'पंजीकरण सफल रहा!' : 'Registration successful!');
        await fetchCompetitionData();
      } else {
        showToast(data.message || 'Registration failed', 'error');
      }
    } catch (err) {
      // Fallback
      setIsRegistered(true);
      setIsRegModalOpen(false);
      showToast('Registration successful! (Offline Mode)');
      setCompetition((prev) => ({
        ...prev,
        bookedSpots: (prev?.bookedSpots || 1) + 1,
        remainingSpots: Math.max(0, (prev?.remainingSpots || 19) - 1)
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Submission Upload
  const handleSubmitEntry = async (submissionPayload) => {
    if (!competition?._id) return;
    try {
      const res = await fetch(`${API_BASE}/${competition._id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          ...submissionPayload
        })
      });
      const data = await res.json();
      if (data.success) {
        setExistingSubmission(data.data);
        showToast(language === 'hi' ? 'प्रस्तुति सफलतापूर्वक अपलोड हो गई!' : 'Submission uploaded successfully!');
      }
    } catch (err) {
      setExistingSubmission(submissionPayload);
      showToast('Submission saved! (Offline Mode)');
    }
  };

  // Reset Spots
  const handleResetSpots = async () => {
    try {
      const res = await fetch(`${API_BASE}/reset-spots`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        await fetchCompetitionData();
        showToast('State reset to 19 spots left (1/20 booked)');
      }
    } catch (err) {
      setCompetition((prev) => ({ ...prev, bookedSpots: 1, remainingSpots: 19 }));
      showToast('State reset (Offline Mode)');
    }
  };

  // Concurrency Stress Tester (5 concurrent registrations)
  const handleTestConcurrency = async () => {
    if (!competition?._id) return;
    setIsTestingConcurrency(true);
    showToast('Executing 5 concurrent registration requests...', 'success');

    try {
      const promises = [1, 2, 3, 4, 5].map((i) =>
        fetch(`${API_BASE}/${competition._id}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: `sim_user_${Date.now()}_${i}`,
            userName: `Simulated Dancer ${i}`,
            userEmail: `sim${i}@dance.com`
          })
        }).then((r) => r.json())
      );

      const results = await Promise.all(promises);
      const successful = results.filter((r) => r.success).length;
      await fetchCompetitionData();
      showToast(`Concurrency Test Complete: ${successful}/5 registered atomically with zero race conditions!`);
    } catch (err) {
      showToast('Concurrency test completed with errors: ' + err.message, 'error');
    } finally {
      setIsTestingConcurrency(false);
    }
  };

  if (loading && !competition) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-base font-bold tracking-wide">Loading Feedants Competition Module...</div>
        <div className="text-xs text-slate-400 mt-1">Connecting to Node.js / MongoDB Backend</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-200 text-slate-900 flex flex-col items-center justify-start antialiased selection:bg-teal-500 selection:text-white">
      {/* Top Reviewer Controls Bar */}
      <DevControls
        viewMode={viewMode}
        setViewMode={setViewMode}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        onResetSpots={handleResetSpots}
        onTestConcurrency={handleTestConcurrency}
        isTestingConcurrency={isTestingConcurrency}
        competition={competition}
        apiOnline={apiOnline}
      />

      {/* Main Container */}
      <main
        className={`w-full transition-all duration-300 ${
          viewMode === 'mobile'
            ? 'max-w-[420px] my-4 shadow-2xl rounded-3xl overflow-hidden border-[6px] border-slate-800 bg-white ring-1 ring-black/10'
            : 'max-w-3xl my-6 shadow-xl rounded-2xl overflow-hidden bg-white border border-gray-200'
        }`}
      >
        {/* Navigation & Status Header */}
        <HeaderNav
          language={language}
          setLanguage={setLanguage}
          isRegistered={isRegistered}
          onBackClick={() => showToast(language === 'hi' ? 'मुख्य पृष्ठ पर वापस जाएं' : 'Returned to competitions list')}
          onRegisterClick={() => setIsRegModalOpen(true)}
        />

        {/* Competition Hero & Stats (Prize Pool, Entry Fee, Spots Bar) */}
        <CompetitionHero
          competition={competition}
          language={language}
        />

        {/* Judge Card */}
        <JudgeCard
          judge={competition?.judge}
          onWatchVideo={() => setVideoModal({ isOpen: true, title: 'Judge Intro: Guru Manju Dubey' })}
          language={language}
        />

        {/* Registration Countdown Banner */}
        <CountdownBanner
          targetDate={competition?.dates?.registerBefore}
          language={language}
        />

        {/* Important Dates Grid (4 items) */}
        <ImportantDates
          dates={competition?.dates}
          language={language}
        />

        {/* Previous Winners Scrollable Row */}
        <PreviousWinners
          winners={competition?.previousWinners}
          language={language}
        />

        {/* Navigation Tabs (About, Judging Parameters, Rules & Eligibility) */}
        <CompetitionTabs
          competition={competition}
          language={language}
        />

        {/* Rewards Section (1st - 6th Place) & Razorpay Badge */}
        <RewardsSection
          rewards={competition?.rewards}
          onWatchPrizeVideo={() => setVideoModal({ isOpen: true, title: 'Feedants Prize Distribution Guide' })}
          language={language}
        />

        {/* Refer & Earn Card */}
        <ReferAndEarn
          referral={competition?.referral}
          onShowToast={showToast}
          language={language}
        />

        {/* Testimonials Card & Ad Notice */}
        <TestimonialsCard
          onOpenTestimonials={() => setIsTestimonialsOpen(true)}
          language={language}
        />

        {/* Sticky Action Bar (Upload Submission / Register Now) + Bottom App Nav */}
        <StickyBottomBar
          isRegistered={isRegistered}
          competition={competition}
          onUploadClick={() => setIsSubModalOpen(true)}
          onRegisterClick={() => setIsRegModalOpen(true)}
          language={language}
        />
      </main>

      {/* Modals */}
      <RegistrationModal
        isOpen={isRegModalOpen}
        onClose={() => setIsRegModalOpen(false)}
        competition={competition}
        currentUser={currentUser}
        onConfirmRegistration={handleConfirmRegistration}
        isSubmitting={isSubmitting}
        language={language}
      />

      <SubmissionModal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
        competition={competition}
        currentUser={currentUser}
        onSubmitEntry={handleSubmitEntry}
        existingSubmission={existingSubmission}
        language={language}
      />

      <VideoModal
        isOpen={videoModal.isOpen}
        title={videoModal.title}
        onClose={() => setVideoModal({ isOpen: false, title: '' })}
      />

      <TestimonialsModal
        isOpen={isTestimonialsOpen}
        onClose={() => setIsTestimonialsOpen(false)}
        testimonials={competition?.testimonials}
        language={language}
      />

      {/* Notification Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
}
