const express = require('express');
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', getContacts);
router.get('/:id', getContactById);
router.post('/', auth, createContact);
router.put('/:id', auth, updateContact);
router.delete('/:id', auth, deleteContact);

module.exports = router;