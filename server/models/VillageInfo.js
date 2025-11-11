const mongoose = require('mongoose');

const villageInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  taluka: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },
  postOffice: { type: String, required: true },
  stdCode: { type: String, required: true },
  elevation: { type: String, required: true },
  assemblyConstituency: { type: String, required: true },
  assemblyMLA: { type: String, required: true },
  lokSabhaConstituency: { type: String, required: true },
  parliamentMP: { type: String, required: true },
  sarpanch: { type: String, required: true },
  mapLink: { type: String, required: true },
  description: { type: String },
  description_mr: { type: String },
  description_hi: { type: String },
  history: { type: String },
  history_mr: { type: String },
  history_hi: { type: String },
  culture: { type: String },
  culture_mr: { type: String },
  culture_hi: { type: String },
  population: { type: Number, default: 0 },
  literacyRate: { type: Number, default: 0 },
  area: { type: Number, default: 0 },
}, {
  timestamps: true,
});

module.exports = mongoose.model('VillageInfo', villageInfoSchema);
