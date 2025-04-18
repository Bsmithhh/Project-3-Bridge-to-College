const mongoose = require('mongoose');

const InteractionSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  studentId: {
    type: String,
    required: true
  },
  collegeName: {
    type: String,
    required: true
  },
  majorInterest: String,
  academicProfile: {
    gpa: Number,
    satMath: Number,
    satEnglish: Number,
    act: Number,
    courseHistory: Map,
    strengthIndicators: {
      logicCourses: [String],
      grades: [String],
      persistence: Number
    }
  },
  flags: [{
    type: String,
    enum: [
      'calculus_override',
      'major_mismatch',
      'financial_concern',
      'demographic_mismatch',
      'location_concern',
      'deeper_needs',
      'custom'
    ]
  }],
  overrideData: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  fitScores: {
    academic: Number,
    social: Number,
    financial: Number
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'resolved'],
    default: 'pending'
  },
  reviewNotes: String
});

module.exports = mongoose.model('Interaction', InteractionSchema); 