const mongoose = require('mongoose');
const Competition = require('../models/competition.model');
const Registration = require('../models/registration.model');
const Submission = require('../models/submission.model');

// In-memory fallback database in case MongoDB Atlas is unreachable/offline
let memoryStore = {
  competitions: [],
  registrations: [],
  submissions: []
};

const DEFAULT_COMPETITION = {
  _id: '66a1f8b2e10984c01f42a991',
  title: 'Feedants Classical Dance',
  slug: 'feedants-classical-dance',
  category: 'Dance',
  tags: ['Dance', 'Multi-Win', 'Winners get certificate'],
  prizePool: 1500,
  entryFee: 99,
  totalSpots: 20,
  bookedSpots: 1,
  remainingSpots: 19,
  judge: {
    name: 'Manju Dubey',
    title: 'Professional Kathak Dancer',
    experience: '12+ Years of Experience',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    introVideoUrl: 'https://www.youtube.com/embed/5qap5aO4i9A'
  },
  dates: {
    registerBefore: new Date(Date.now() + (1 * 24 * 3600 + 6 * 3600 + 28 * 60 + 32) * 1000).toISOString(),
    registerBeforeDisplay: '10 Aug 26, 11:50 PM',
    submissionStartsDisplay: '11 Aug 26, 04:00 AM',
    submissionEndsDisplay: '20 Aug 26, 11:55 PM',
    resultDateDisplay: '1 Sept 26, 11:50 PM'
  },
  previousWinners: [
    {
      id: 'w1',
      name: 'Riya Shah',
      rank: 1,
      badge: '1st Place',
      style: 'Kathak',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'w2',
      name: 'Aarav Mehta',
      rank: 2,
      badge: '2nd Place',
      style: 'Bharatanatyam',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'w3',
      name: 'Neha Verma',
      rank: 3,
      badge: '3rd Place',
      style: 'Odissi',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'w4',
      name: 'Ishita C',
      rank: 4,
      badge: 'Finalist',
      style: 'Kuchipudi',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80'
    }
  ],
  rewards: [
    { rank: 1, title: '1st Winner', amount: 550, badge: 'gold' },
    { rank: 2, title: '2nd Winner', amount: 300, badge: 'silver' },
    { rank: 3, title: '3rd Winner', amount: 240, badge: 'bronze' },
    { rank: 4, title: '4th Winner', amount: 200, badge: 'star' },
    { rank: 5, title: '5th Winner', amount: 130, badge: 'star' },
    { rank: 6, title: '6th Winner', amount: 80, badge: 'star' }
  ],
  description: 'This is an online classical dance competition open for all age groups. Showcase your talent in Bharatanatyam, Kathak, Odissi, Kuchipudi, or Kathakali. Participate from anywhere and let prominent judges evaluate your passion through traditional dance. Express your authentic devotion and technique to win certificates and cash prizes.',
  judgingParameters: [
    {
      name: 'Taala & Rhythm Adherence',
      weight: '30%',
      description: 'Synchronicity with rhythm, laya, accurate footwork (tatkar), and tempo control.'
    },
    {
      name: 'Bhava & Abhinaya',
      weight: '25%',
      description: 'Facial expressions, emotional depth, storytelling, and eye movements (drishti bhed).'
    },
    {
      name: 'Anga Shuddhi & Mudras',
      weight: '20%',
      description: 'Clarity of classical hand gestures (hastas), body alignment, and posture precision.'
    },
    {
      name: 'Costume & Presentation',
      weight: '15%',
      description: 'Traditional dance attire, ghungroos, authentic jewelry, and video aesthetic.'
    },
    {
      name: 'Originality & Choreography',
      weight: '10%',
      description: 'Creative flow, seamless transitions, and artistic presentation.'
    }
  ],
  rules: [
    'Performance video duration must be between 2 to 5 minutes.',
    'Video must be recorded in landscape mode with high resolution (720p or 1080p).',
    'Audio must be clearly audible without heavy echo or background noise.',
    'No video cuts, filters, special effects, or speed manipulation allowed during the dance.',
    'Contestant must state their name and style briefly at the beginning of the clip.',
    'Submissions must be made before 20 Aug 26, 11:55 PM IST.',
    'Open to all age categories and nationalities.'
  ],
  referral: {
    code: 'classicd22',
    url: 'https://feedants.com/c/classicd22',
    rewardText: 'Earn ₹50 for every express'
  },
  testimonials: [
    {
      name: 'Pooja Iyer',
      style: 'Bharatanatyam Winner 2025',
      comment: 'Participating was an enriching experience! The judging remarks from Guru Manju Dubey gave me immense clarity on my posture.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Vikram Sengupta',
      style: 'Kathak Performer',
      comment: 'Super smooth registration and prompt communication. Prize money was credited directly within 24 hours of results.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    }
  ],
  status: 'open'
};

// Initialize memory store
memoryStore.competitions.push({ ...DEFAULT_COMPETITION });
// Seed initial user demo registration
memoryStore.registrations.push({
  _id: 'reg_initial_demo',
  competitionId: DEFAULT_COMPETITION._id,
  userId: 'user_1',
  userName: 'Riya Sharma',
  userEmail: 'riya@feedants.com',
  amount: 99,
  paymentStatus: 'completed',
  transactionId: 'TXN_FEEDA991X',
  registeredAt: new Date()
});

function isMongoConnected() {
  return mongoose.connection && mongoose.connection.readyState === 1;
}

// Ensure seeded in real MongoDB if connected
async function seedMongoIfNeeded() {
  if (!isMongoConnected()) return;
  try {
    const count = await Competition.countDocuments();
    if (count === 0) {
      await Competition.create(DEFAULT_COMPETITION);
      console.log('Seed: Default Competition created in MongoDB');
    }
  } catch (err) {
    console.error('Error auto-seeding MongoDB:', err.message);
  }
}

// Mutex lock for handling concurrent registrations safely
let registrationLock = false;
async function acquireLock(timeout = 5000) {
  const start = Date.now();
  while (registrationLock) {
    if (Date.now() - start > timeout) {
      throw new Error('Lock acquisition timeout');
    }
    await new Promise(r => setTimeout(r, 10));
  }
  registrationLock = true;
}
function releaseLock() {
  registrationLock = false;
}

const CompetitionService = {
  async getCurrentCompetition() {
    await seedMongoIfNeeded();

    if (isMongoConnected()) {
      try {
        let comp = await Competition.findOne({ slug: 'feedants-classical-dance' });
        if (!comp) {
          comp = await Competition.create(DEFAULT_COMPETITION);
        }
        return comp;
      } catch (err) {
        console.warn('MongoDB query failed, falling back to memory store:', err.message);
      }
    }

    const memoryComp = memoryStore.competitions[0];
    memoryComp.remainingSpots = Math.max(0, memoryComp.totalSpots - memoryComp.bookedSpots);
    return memoryComp;
  },

  async getCompetitionById(id) {
    if (isMongoConnected()) {
      try {
        const comp = await Competition.findById(id);
        if (comp) return comp;
      } catch (err) {
        // Fallback to memory
      }
    }
    return memoryStore.competitions.find(c => c._id === id || c.slug === id) || memoryStore.competitions[0];
  },

  async registerUser({ competitionId, userId, userName, userEmail }) {
    await acquireLock();
    try {
      if (isMongoConnected()) {
        try {
          // Atomic findOneAndUpdate with condition bookedSpots < totalSpots
          // This guarantees concurrency safety in MongoDB!
          const comp = await Competition.findOneAndUpdate(
            { _id: competitionId, bookedSpots: { $lt: 20 } },
            { $inc: { bookedSpots: 1 } },
            { new: true }
          );

          if (!comp) {
            const check = await Competition.findById(competitionId);
            if (check && check.bookedSpots >= check.totalSpots) {
              const err = new Error('Competition spots are full! No seats left.');
              err.status = 400;
              throw err;
            }
          }

          // Create or update registration
          const reg = await Registration.findOneAndUpdate(
            { competitionId, userId },
            {
              competitionId,
              userId,
              userName: userName || 'Participant',
              userEmail: userEmail || `${userId}@feedants.com`,
              amount: comp.entryFee,
              paymentStatus: 'completed',
              transactionId: 'TXN_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
              registeredAt: new Date()
            },
            { upsert: true, new: true }
          );

          return {
            success: true,
            registration: reg,
            competition: comp
          };
        } catch (err) {
          if (err.status) throw err;
          console.warn('Mongo register failed, falling back to memory:', err.message);
        }
      }

      // Memory implementation with guaranteed atomic concurrency
      const comp = memoryStore.competitions.find(c => c._id === competitionId || c.slug === competitionId) || memoryStore.competitions[0];
      if (comp.bookedSpots >= comp.totalSpots) {
        const err = new Error('Competition spots are full! No seats left.');
        err.status = 400;
        throw err;
      }

      const existing = memoryStore.registrations.find(r => r.competitionId === comp._id && r.userId === userId);
      if (existing) {
        return {
          success: true,
          message: 'User already registered',
          registration: existing,
          competition: comp
        };
      }

      comp.bookedSpots += 1;
      comp.remainingSpots = Math.max(0, comp.totalSpots - comp.bookedSpots);

      const reg = {
        _id: 'reg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        competitionId: comp._id,
        userId,
        userName: userName || 'Dance Participant',
        userEmail: userEmail || `${userId}@feedants.com`,
        amount: comp.entryFee,
        paymentStatus: 'completed',
        transactionId: 'TXN_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        registeredAt: new Date()
      };

      memoryStore.registrations.push(reg);

      return {
        success: true,
        registration: reg,
        competition: comp
      };
    } finally {
      releaseLock();
    }
  },

  async checkRegistration(competitionId, userId) {
    if (isMongoConnected()) {
      try {
        const reg = await Registration.findOne({ competitionId, userId });
        if (reg) return { isRegistered: true, registration: reg };
      } catch (err) {
        // Fallback
      }
    }

    const reg = memoryStore.registrations.find(r => (r.competitionId === competitionId || competitionId === 'current') && r.userId === userId);
    return {
      isRegistered: !!reg,
      registration: reg || null
    };
  },

  async cancelRegistration(competitionId, userId) {
    await acquireLock();
    try {
      if (isMongoConnected()) {
        try {
          const reg = await Registration.findOneAndDelete({ competitionId, userId });
          if (reg) {
            await Competition.findByIdAndUpdate(competitionId, { $inc: { bookedSpots: -1 } });
            return { success: true, message: 'Registration cancelled' };
          }
        } catch (err) {
          // Fallback
        }
      }

      const comp = memoryStore.competitions[0];
      const index = memoryStore.registrations.findIndex(r => r.userId === userId);
      if (index !== -1) {
        memoryStore.registrations.splice(index, 1);
        if (comp.bookedSpots > 0) {
          comp.bookedSpots -= 1;
          comp.remainingSpots = Math.max(0, comp.totalSpots - comp.bookedSpots);
        }
        return { success: true, message: 'Registration cancelled' };
      }

      return { success: false, message: 'Registration not found' };
    } finally {
      releaseLock();
    }
  },

  async resetSpots() {
    await acquireLock();
    try {
      if (isMongoConnected()) {
        try {
          await Competition.findOneAndUpdate(
            { slug: 'feedants-classical-dance' },
            { bookedSpots: 1 }
          );
          // keep demo user_1 registered
          await Registration.deleteMany({ userId: { $ne: 'user_1' } });
        } catch (err) {
          // Fallback
        }
      }

      const comp = memoryStore.competitions[0];
      comp.bookedSpots = 1;
      comp.remainingSpots = 19;
      memoryStore.registrations = memoryStore.registrations.filter(r => r.userId === 'user_1');

      return { success: true, competition: comp };
    } finally {
      releaseLock();
    }
  },

  async createSubmission({ competitionId, userId, title, danceStyle, videoUrl, notes }) {
    if (isMongoConnected()) {
      try {
        const sub = await Submission.findOneAndUpdate(
          { competitionId, userId },
          { competitionId, userId, title, danceStyle, videoUrl, notes, submittedAt: new Date(), status: 'submitted' },
          { upsert: true, new: true }
        );
        return sub;
      } catch (err) {
        // Fallback
      }
    }

    let sub = memoryStore.submissions.find(s => s.userId === userId && s.competitionId === competitionId);
    if (sub) {
      sub.title = title;
      sub.danceStyle = danceStyle;
      sub.videoUrl = videoUrl;
      sub.notes = notes;
      sub.submittedAt = new Date();
    } else {
      sub = {
        _id: 'sub_' + Date.now(),
        competitionId,
        userId,
        title,
        danceStyle: danceStyle || 'Kathak',
        videoUrl,
        notes: notes || '',
        submittedAt: new Date(),
        status: 'submitted'
      };
      memoryStore.submissions.push(sub);
    }
    return sub;
  },

  async getSubmission(competitionId, userId) {
    if (isMongoConnected()) {
      try {
        const sub = await Submission.findOne({ competitionId, userId });
        if (sub) return sub;
      } catch (err) {
        // Fallback
      }
    }
    return memoryStore.submissions.find(s => s.userId === userId) || null;
  }
};

module.exports = CompetitionService;
