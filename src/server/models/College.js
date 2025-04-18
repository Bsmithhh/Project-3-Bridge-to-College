const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: String,
  state: String,
  demographics: {
    asian: Number,
    africanAmerican: Number,
    caucasian: Number,
    hispanic: Number,
    nativeAmerican: Number,
    pacificIslander: Number
  },
  academics: {
    averageGPA: Number,
    satMath: Number,
    satEnglish: Number,
    actRange: String,
    graduationRate4yr: Number,
    graduationRate6yr: Number
  },
  requirements: {
    english: Number,
    math: Number,
    science: {
      required: [String],
      labsRequired: [String]
    },
    worldLanguage: Number,
    socialStudies: Number
  },
  admissions: {
    applicants: Number,
    admissionRate: Number,
    enrollmentRate: Number,
    commonApp: Boolean,
    earlyDecision: Boolean,
    earlyDueDate: Date,
    regularDueDate: Date
  },
  costs: {
    annualTuition: Number,
    roomAndBoard: Number,
    requiresCss: Boolean,
    averageDebt: Number,
    plusDebtRatio: String,
    netPresentValue10yr: Number
  }
});

module.exports = mongoose.model('College', CollegeSchema); 