const VillageInfo = require('../models/VillageInfo');

const getVillageInfo = async (req, res) => {
  try {
    const { lang = 'en' } = req.query;
    let villageInfo = await VillageInfo.findOne();

    if (!villageInfo) {
      // Create default village info if none exists
      villageInfo = new VillageInfo();
      await villageInfo.save();
    }

    // Localize the response based on language
    const localizedVillageInfo = {
      _id: villageInfo._id,
      villageName: villageInfo[`villageName_${lang}`] || villageInfo.villageName,
      description: villageInfo[`description_${lang}`] || villageInfo.description,
      history: villageInfo[`history_${lang}`] || villageInfo.history,
      population: villageInfo.population,
      area: villageInfo.area,
      literacyRate: villageInfo.literacyRate,
      mainOccupation: villageInfo[`mainOccupation_${lang}`] || villageInfo.mainOccupation,
      landmarks: (villageInfo.landmarks || []).map(landmark => ({
        name: landmark[`name_${lang}`] || landmark.name,
        description: landmark[`description_${lang}`] || landmark.description,
        type: landmark.type
      })),
      contactInfo: villageInfo.contactInfo,
      achievements: (villageInfo.achievements || []).map(achievement => ({
        title: achievement[`title_${lang}`] || achievement.title,
        description: achievement[`description_${lang}`] || achievement.description,
        year: achievement.year
      })),
      createdAt: villageInfo.createdAt,
      updatedAt: villageInfo.updatedAt
    };

    res.status(200).json({
      success: true,
      data: localizedVillageInfo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVillageInfo = async (req, res) => {
  try {
    let villageInfo = await VillageInfo.findOne();

    if (!villageInfo) {
      villageInfo = new VillageInfo();
    }

    villageInfo = await VillageInfo.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      data: villageInfo,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getVillageInfo,
  updateVillageInfo,
};