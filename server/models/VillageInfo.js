const mongoose = require('mongoose');

const villageInfoSchema = new mongoose.Schema({
  // Basic village information with multilingual support
  name_en: { type: String, required: true },
  name_mr: { type: String, required: true },
  name_hi: { type: String, required: true },

  // Location information
  taluka_en: { type: String, required: true },
  taluka_mr: { type: String, required: true },
  taluka_hi: { type: String, required: true },

  district_en: { type: String, required: true },
  district_mr: { type: String, required: true },
  district_hi: { type: String, required: true },

  state_en: { type: String, required: true },
  state_mr: { type: String, required: true },
  state_hi: { type: String, required: true },

  // Postal and communication
  pinCode: { type: String, required: true },
  postOffice_en: { type: String, required: true },
  postOffice_mr: { type: String, required: true },
  postOffice_hi: { type: String, required: true },
  stdCode: { type: String, required: true },
  elevation: { type: String },

  // Government representation
  assemblyConstituency_en: { type: String, required: true },
  assemblyConstituency_mr: { type: String, required: true },
  assemblyConstituency_hi: { type: String, required: true },

  assemblyMLA_en: { type: String, required: true },
  assemblyMLA_mr: { type: String, required: true },
  assemblyMLA_hi: { type: String, required: true },

  lokSabhaConstituency_en: { type: String, required: true },
  lokSabhaConstituency_mr: { type: String, required: true },
  lokSabhaConstituency_hi: { type: String, required: true },

  parliamentMP_en: { type: String, required: true },
  parliamentMP_mr: { type: String, required: true },
  parliamentMP_hi: { type: String, required: true },

  // Local leadership
  sarpanch_en: { type: String, required: true },
  sarpanch_mr: { type: String, required: true },
  sarpanch_hi: { type: String, required: true },

  // Geographic information
  mapLink: { type: String },
  population: { type: Number, default: 0 },
  literacyRate: { type: Number, default: 0 },
  area: { type: Number, default: 0 }, // in square kilometers

  // Descriptive content
  description_en: { type: String },
  description_mr: { type: String },
  description_hi: { type: String },

  history_en: { type: String },
  history_mr: { type: String },
  history_hi: { type: String },

  culture_en: { type: String },
  culture_mr: { type: String },
  culture_hi: { type: String },

  // Administrative information
  grampanchayatContact_en: { type: String },
  grampanchayatContact_mr: { type: String },
  grampanchayatContact_hi: { type: String },

  establishedYear: { type: Number },

  // Climate and geography
  climate_en: { type: String },
  climate_mr: { type: String },
  climate_hi: { type: String },

  // Demographics
  malePopulation: { type: Number, default: 0 },
  femalePopulation: { type: Number, default: 0 },
  otherPopulation: { type: Number, default: 0 },

  // Infrastructure
  totalHouses: { type: Number, default: 0 },
  schools: { type: Number, default: 0 },
  hospitals: { type: Number, default: 0 },

  // Economy
  mainOccupation_en: { type: String },
  mainOccupation_mr: { type: String },
  mainOccupation_hi: { type: String },

  // Festivals and traditions
  festivals_en: { type: String },
  festivals_mr: { type: String },
  festivals_hi: { type: String },
}, {
  timestamps: true,
});

module.exports = mongoose.model('VillageInfo', villageInfoSchema);
