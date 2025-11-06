const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: String,
    enum: ['village', 'events', 'development', 'culture', 'festival', 'meeting', 'other'],
    default: 'village',
  },
  description: {
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

module.exports = mongoose.model('Gallery', gallerySchema);