const mongoose = require('mongoose');

const competitionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Feedants Classical Dance'
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    default: 'feedants-classical-dance'
  },
  category: {
    type: String,
    default: 'Dance'
  },
  tags: {
    type: [String],
    default: ['Dance', 'Multi-Win', 'Winners get certificate']
  },
  prizePool: {
    type: Number,
    required: true,
    default: 1500
  },
  entryFee: {
    type: Number,
    required: true,
    default: 99
  },
  totalSpots: {
    type: Number,
    required: true,
    default: 20
  },
  bookedSpots: {
    type: Number,
    required: true,
    default: 1
  },
  judge: {
    name: { type: String, default: 'Manju Dubey' },
    title: { type: String, default: 'Professional Kathak Dancer' },
    experience: { type: String, default: '12+ Years of Experience' },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
    introVideoUrl: { type: String, default: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
  },
  dates: {
    registerBefore: { type: Date, default: () => new Date(Date.now() + 1000 * 60 * 60 * 30.5) }, // ~1 day 6 hours
    registerBeforeDisplay: { type: String, default: '10 Aug 26, 11:50 PM' },
    submissionStartsDisplay: { type: String, default: '11 Aug 26, 04:00 AM' },
    submissionEndsDisplay: { type: String, default: '20 Aug 26, 11:55 PM' },
    resultDateDisplay: { type: String, default: '1 Sept 26, 11:50 PM' }
  },
  previousWinners: [
    {
      name: { type: String },
      rank: { type: Number },
      badge: { type: String },
      style: { type: String },
      avatar: { type: String }
    }
  ],
  rewards: [
    {
      rank: { type: Number },
      title: { type: String },
      amount: { type: Number },
      badge: { type: String }
    }
  ],
  description: {
    type: String,
    default: 'This is an online classical dance competition open for all age groups. Showcase your talent in Bharatanatyam, Kathak, Odissi, Kuchipudi, or Kathakali. Participate from anywhere and let prominent judges evaluate your passion through traditional dance. Get ranked among top performers across the nation and win guaranteed certificates and cash rewards.'
  },
  judgingParameters: [
    {
      name: { type: String },
      weight: { type: String },
      description: { type: String }
    }
  ],
  rules: [
    { type: String }
  ],
  referral: {
    code: { type: String, default: 'classicd22' },
    url: { type: String, default: 'https://feedants.com/c/classicd22' },
    rewardText: { type: String, default: 'Earn ₹50 for every express' }
  },
  testimonials: [
    {
      name: { type: String },
      style: { type: String },
      comment: { type: String },
      rating: { type: Number },
      avatar: { type: String }
    }
  ],
  status: {
    type: String,
    enum: ['upcoming', 'open', 'submission_open', 'judging', 'completed'],
    default: 'open'
  }
}, { timestamps: true });

// Virtual for remaining spots
competitionSchema.virtual('remainingSpots').get(function() {
  return Math.max(0, this.totalSpots - this.bookedSpots);
});

competitionSchema.set('toJSON', { virtuals: true });
competitionSchema.set('toObject', { virtuals: true });

const Competition = mongoose.models.Competition || mongoose.model('Competition', competitionSchema);

module.exports = Competition;
