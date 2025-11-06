const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['agriculture', 'education', 'health', 'housing', 'employment', 'welfare', 'infrastructure', 'other'],
    required: true,
  },
  eligibility: {
    type: String,
  },
  benefits: {
    type: String,
  },
  documents: [{
    name: String,
    url: String,
  }],
  applicationLink: {
    type: String,
  },
  lastDate: {
    type: Date,
  },
  contactPerson: {
    type: String,
  },
  contactPhone: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Scheme', schemeSchema);