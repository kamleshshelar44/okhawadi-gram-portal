const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
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
    enum: ['village', 'development', 'education', 'health', 'environment', 'culture', 'other'],
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  organization: {
    type: String,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Award', awardSchema);