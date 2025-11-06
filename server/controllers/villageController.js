const VillageInfo = require('../models/VillageInfo');

const getVillageInfo = async (req, res) => {
  try {
    let villageInfo = await VillageInfo.findOne();

    if (!villageInfo) {
      // Create default village info if none exists
      villageInfo = new VillageInfo();
      await villageInfo.save();
    }

    res.status(200).json({
      success: true,
      data: villageInfo,
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