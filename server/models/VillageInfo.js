const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
});

const festivalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

const villageInfoSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Okhawadi (ओखवडी)' },
    taluka: { type: String, default: 'Jawali' },
    district: { type: String, default: 'Satara' },
    state: { type: String, default: 'Maharashtra' },
    pinCode: { type: String, default: '415012' },
    postOffice: { type: String, default: 'Medha' },
    stdCode: { type: String, default: '02378' },
    elevation: { type: String, default: '678 meters Above Sea Level' },
    assemblyConstituency: { type: String, default: 'Satara Assembly Constituency' },
    assemblyMLA: { type: String, default: 'Shrimant Chh. Shivendrasinh Abhaysinhraje Bhosale' },
    lokSabhaConstituency: { type: String, default: 'Satara Parliamentary Constituency' },
    parliamentMP: { type: String, default: 'Shrimant Chh. Udayanraje Pratapsinhmaharaj Bhosale' },
    sarpanch: { type: String, default: 'Kausalya Laxman Shelar' },
    mapLink: { type: String, default: 'https://maps.app.goo.gl/Q6WzhrChjYEhK6Tm9' },
    population: { type: Number, default: 0 },
    literacyRate: { type: Number, default: 0 },
    area: { type: Number, default: 0 },
    waterSources: [{ type: String }],
    schools: [schoolSchema],
    description: { type: String },
    history: { type: String },
    culture: { type: String },
    festivals: [festivalSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('VillageInfo', villageInfoSchema);
