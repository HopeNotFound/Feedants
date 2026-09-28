const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  competitionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competition',
    required: true
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  userName: {
    type: String,
    default: 'Dance Participant'
  },
  userEmail: {
    type: String,
    default: 'user@feedants.com'
  },
  amount: {
    type: Number,
    required: true,
    default: 99
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'completed'
  },
  transactionId: {
    type: String,
    default: () => 'TXN_' + Math.random().toString(36).substring(2, 10).toUpperCase()
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Prevent duplicate registration for the same user on the same competition
registrationSchema.index({ competitionId: 1, userId: 1 }, { unique: true });

const Registration = mongoose.models.Registration || mongoose.model('Registration', registrationSchema);

module.exports = Registration;
