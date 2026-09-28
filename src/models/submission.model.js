const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
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
  title: {
    type: String,
    required: true
  },
  danceStyle: {
    type: String,
    default: 'Kathak'
  },
  videoUrl: {
    type: String,
    required: true
  },
  durationSeconds: {
    type: Number,
    default: 180
  },
  notes: {
    type: String,
    default: ''
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['submitted', 'under_review', 'evaluated'],
    default: 'submitted'
  }
}, { timestamps: true });

const Submission = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);

module.exports = Submission;
