const Gallery = require('../models/Gallery');

const getGallery = async (req, res) => {
  try {
    const { page = 1, limit = 20, category, type } = req.query;

    const query = { isActive: true };
    if (category) {
      query.category = category;
    }
    if (type) {
      query.type = type;
    }

    const gallery = await Gallery.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Gallery.countDocuments(query);

    res.status(200).json({
      success: true,
      data: gallery,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.status(200).json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createGalleryItem = async (req, res) => {
  try {
    const galleryData = req.body;

    if (req.file) {
      galleryData.url = `/uploads/${req.file.filename}`;
      galleryData.thumbnail = `/uploads/${req.file.filename}`;
    }

    const gallery = await Gallery.create(galleryData);

    res.status(201).json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateGalleryItem = async (req, res) => {
  try {
    const updateData = req.body;

    if (req.file) {
      updateData.url = `/uploads/${req.file.filename}`;
      updateData.thumbnail = `/uploads/${req.file.filename}`;
    }

    const gallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!gallery) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.status(200).json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteGalleryItem = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);

    if (!gallery) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Gallery item deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGallery,
  getGalleryById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
};