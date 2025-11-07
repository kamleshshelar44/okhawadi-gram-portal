const Award = require('../models/Award');

const getAwards = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, year } = req.query;

    const query = { isActive: true };
    if (category) {
      query.category = category;
    }
    if (year) {
      query.year = parseInt(year);
    }

    const awards = await Award.find(query)
      .sort({ year: -1, date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Award.countDocuments(query);

    res.status(200).json({
      success: true,
      data: awards,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAwardById = async (req, res) => {
  try {
    const award = await Award.findById(req.params.id);

    if (!award) {
      return res.status(404).json({ message: 'Award not found' });
    }

    res.status(200).json({
      success: true,
      data: award,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAward = async (req, res) => {
  try {
    const awardData = req.body;

    if (req.file) {
      awardData.image = `/uploads/${req.file.filename}`;
    }

    const award = await Award.create(awardData);

    res.status(201).json({
      success: true,
      data: award,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAward = async (req, res) => {
  try {
    const updateData = req.body;

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const award = await Award.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!award) {
      return res.status(404).json({ message: 'Award not found' });
    }

    res.status(200).json({
      success: true,
      data: award,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAward = async (req, res) => {
  try {
    const award = await Award.findByIdAndDelete(req.params.id);

    if (!award) {
      return res.status(404).json({ message: 'Award not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Award deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAwards,
  getAwardById,
  createAward,
  updateAward,
  deleteAward,
};