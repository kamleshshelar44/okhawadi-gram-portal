const express = require('express');
const {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} = require('../controllers/newsController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', getNews);
router.get('/:id', getNewsById);
router.post('/', auth, createNews);
router.put('/:id', auth, updateNews);
router.delete('/:id', auth, deleteNews);

module.exports = router;