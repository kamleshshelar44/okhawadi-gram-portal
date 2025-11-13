const express = require('express');
const {
  getVillageInfo,
  updateVillageInfo,
  getVillageInfoForAdmin,
  deleteVillageInfo
} = require('../controllers/villageController');
const auth = require('../middleware/auth');

const router = express.Router();

// Public endpoint - gets localized village information
router.get('/', getVillageInfo);

// Admin endpoints - require authentication
router.get('/admin', auth, getVillageInfoForAdmin);
router.put('/', auth, updateVillageInfo);
router.delete('/', auth, deleteVillageInfo);

module.exports = router;