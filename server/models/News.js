const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['news', 'announcement', 'update', 'event','development','education'],
    default: 'news',
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    default: 'Gram Panchayat',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('News', newsSchema);