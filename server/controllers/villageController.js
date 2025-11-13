const VillageInfo = require('../models/VillageInfo');

// Get village information with localization support
const getVillageInfo = async (req, res) => {
  try {
    const { lang = 'en' } = req.query;
    let villageInfo = await VillageInfo.findOne();

    if (!villageInfo) {
      // Create default village info if none exists
      const defaultVillageInfo = new VillageInfo({
        name_en: 'Okhawadi',
        name_mr: 'ओखावडी',
        name_hi: 'ओखावडी',
        taluka_en: 'Karjat',
        taluka_mr: 'कर्जत',
        taluka_hi: 'कर्जत',
        district_en: 'Ahmednagar',
        district_mr: 'अहमदनगर',
        district_hi: 'अहमदनगर',
        state_en: 'Maharashtra',
        state_mr: 'महाराष्ट्र',
        state_hi: 'महाराष्ट्र',
        pinCode: '424301',
        postOffice_en: 'Okhawadi',
        postOffice_mr: 'ओखावडी',
        postOffice_hi: 'ओखावडी',
        stdCode: '02428',
        elevation: '557',
        assemblyConstituency_en: 'Karjat North',
        assemblyConstituency_mr: 'कर्जत उत्तर',
        assemblyConstituency_hi: 'कर्जत उत्तर',
        assemblyMLA_en: 'TBD',
        assemblyMLA_mr: 'टीबीडी',
        assemblyMLA_hi: 'टीबीडी',
        lokSabhaConstituency_en: 'Shirdi',
        lokSabhaConstituency_mr: 'शिर्डी',
        lokSabhaConstituency_hi: 'शिर्डी',
        parliamentMP_en: 'TBD',
        parliamentMP_mr: 'टीबीडी',
        parliamentMP_hi: 'टीबीडी',
        sarpanch_en: 'TBD',
        sarpanch_mr: 'टीबीडी',
        sarpanch_hi: 'टीबीडी',
        population: 0,
        literacyRate: 0,
        area: 0,
        description_en: 'Welcome to Okhawadi village',
        description_mr: 'ओखावडी गावात आपले स्वागत आहे',
        description_hi: 'ओखावडी गांव में आपका स्वागत है',
        history_en: 'The history of Okhawadi village dates back several centuries.',
        history_mr: 'ओखावडी गावाचा इतिहास अनेक शतकांपूर्वीचा आहे.',
        history_hi: 'ओखावडी गांव का इतिहास कई शताब्दियों पुराना है।',
        culture_en: 'The culture of Okhawadi reflects traditional rural Maharashtra.',
        culture_mr: 'ओखावडीची संस्कृती पारंपारिक ग्रामीण महाराष्ट्राची प्रतिबिंबित करते.',
        culture_hi: 'ओखावडी की संस्कृति पारंपरिक ग्रामीण महाराष्ट्र को दर्शाती है।',
      });
      villageInfo = await defaultVillageInfo.save();
    }

    // Create localized response based on language preference
    const localizedVillageInfo = {
      _id: villageInfo._id,
      name: villageInfo[`name_${lang}`] || villageInfo.name_en,
      taluka: villageInfo[`taluka_${lang}`] || villageInfo.taluka_en,
      district: villageInfo[`district_${lang}`] || villageInfo.district_en,
      state: villageInfo[`state_${lang}`] || villageInfo.state_en,
      pinCode: villageInfo.pinCode,
      postOffice: villageInfo[`postOffice_${lang}`] || villageInfo.postOffice_en,
      stdCode: villageInfo.stdCode,
      elevation: villageInfo.elevation,
      assemblyConstituency: villageInfo[`assemblyConstituency_${lang}`] || villageInfo.assemblyConstituency_en,
      assemblyMLA: villageInfo[`assemblyMLA_${lang}`] || villageInfo.assemblyMLA_en,
      lokSabhaConstituency: villageInfo[`lokSabhaConstituency_${lang}`] || villageInfo.lokSabhaConstituency_en,
      parliamentMP: villageInfo[`parliamentMP_${lang}`] || villageInfo.parliamentMP_en,
      sarpanch: villageInfo[`sarpanch_${lang}`] || villageInfo.sarpanch_en,
      mapLink: villageInfo.mapLink,
      population: villageInfo.population,
      literacyRate: villageInfo.literacyRate,
      area: villageInfo.area,
      description: villageInfo[`description_${lang}`] || villageInfo.description_en,
      history: villageInfo[`history_${lang}`] || villageInfo.history_en,
      culture: villageInfo[`culture_${lang}`] || villageInfo.culture_en,
      grampanchayatContact: villageInfo[`grampanchayatContact_${lang}`] || villageInfo.grampanchayatContact_en,
      establishedYear: villageInfo.establishedYear,
      climate: villageInfo[`climate_${lang}`] || villageInfo.climate_en,
      malePopulation: villageInfo.malePopulation,
      femalePopulation: villageInfo.femalePopulation,
      otherPopulation: villageInfo.otherPopulation,
      totalHouses: villageInfo.totalHouses,
      schools: villageInfo.schools,
      hospitals: villageInfo.hospitals,
      mainOccupation: villageInfo[`mainOccupation_${lang}`] || villageInfo.mainOccupation_en,
      festivals: villageInfo[`festivals_${lang}`] || villageInfo.festivals_en,
      createdAt: villageInfo.createdAt,
      updatedAt: villageInfo.updatedAt
    };

    res.status(200).json({
      success: true,
      data: localizedVillageInfo,
    });
  } catch (error) {
    console.error('Error in getVillageInfo:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching village information',
      error: error.message
    });
  }
};

// Create or update village information (full CRUD support)
const updateVillageInfo = async (req, res) => {
  try {
    let villageInfo = await VillageInfo.findOne();

    if (!villageInfo) {
      // If no village info exists, create new one
      villageInfo = new VillageInfo(req.body);
      await villageInfo.save();
    } else {
      // Update existing village info
      Object.assign(villageInfo, req.body);
      await villageInfo.save();
    }

    res.status(200).json({
      success: true,
      message: 'Village information updated successfully',
      data: villageInfo,
    });
  } catch (error) {
    console.error('Error in updateVillageInfo:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating village information',
      error: error.message
    });
  }
};

// Get raw village information (for admin panel - all languages)
const getVillageInfoForAdmin = async (req, res) => {
  try {
    let villageInfo = await VillageInfo.findOne();

    if (!villageInfo) {
      // Create default village info if none exists
      const defaultVillageInfo = new VillageInfo({
        name_en: 'Okhawadi',
        name_mr: 'ओखावडी',
        name_hi: 'ओखावडी',
        taluka_en: 'Karjat',
        taluka_mr: 'कर्जत',
        taluka_hi: 'कर्जत',
        district_en: 'Ahmednagar',
        district_mr: 'अहमदनगर',
        district_hi: 'अहमदनगर',
        state_en: 'Maharashtra',
        state_mr: 'महाराष्ट्र',
        state_hi: 'महाराष्ट्र',
        pinCode: '424301',
        postOffice_en: 'Okhawadi',
        postOffice_mr: 'ओखावडी',
        postOffice_hi: 'ओखावडी',
        stdCode: '02428',
        elevation: '557',
        assemblyConstituency_en: 'Karjat North',
        assemblyConstituency_mr: 'कर्जत उत्तर',
        assemblyConstituency_hi: 'कर्जत उत्तर',
        assemblyMLA_en: 'TBD',
        assemblyMLA_mr: 'टीबीडी',
        assemblyMLA_hi: 'टीबीडी',
        lokSabhaConstituency_en: 'Shirdi',
        lokSabhaConstituency_mr: 'शिर्डी',
        lokSabhaConstituency_hi: 'शिर्डी',
        parliamentMP_en: 'TBD',
        parliamentMP_mr: 'टीबीडी',
        parliamentMP_hi: 'टीबीडी',
        sarpanch_en: 'TBD',
        sarpanch_mr: 'टीबीडी',
        sarpanch_hi: 'टीबीडी',
      });
      villageInfo = await defaultVillageInfo.save();
    }

    res.status(200).json({
      success: true,
      data: villageInfo,
    });
  } catch (error) {
    console.error('Error in getVillageInfoForAdmin:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching village information for admin',
      error: error.message
    });
  }
};

// Delete village information (reset to defaults)
const deleteVillageInfo = async (req, res) => {
  try {
    const deleted = await VillageInfo.deleteMany({});

    res.status(200).json({
      success: true,
      message: 'Village information reset successfully',
      deletedCount: deleted.deletedCount,
    });
  } catch (error) {
    console.error('Error in deleteVillageInfo:', error);
    res.status(400).json({
      success: false,
      message: 'Error resetting village information',
      error: error.message
    });
  }
};

module.exports = {
  getVillageInfo,
  updateVillageInfo,
  getVillageInfoForAdmin,
  deleteVillageInfo,
};