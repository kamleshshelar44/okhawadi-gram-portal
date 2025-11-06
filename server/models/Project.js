const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
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
    enum: ['infrastructure', 'water', 'education', 'health', 'roads', 'electricity', 'sanitation', 'other'],
    required: true,
  },
  status: {
    type: String,
    enum: ['planning', 'in-progress', 'completed', 'on-hold'],
    default: 'planning',
  },
  budget: {
    type: Number,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  images: [{
    type: String,
  }],
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Project', projectSchema);