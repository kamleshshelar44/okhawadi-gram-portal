const express = require('express');
const { getVillageInfo, updateVillageInfo } = require('../controllers/villageController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', getVillageInfo);
router.put('/', auth, updateVillageInfo);

module.exports = router;