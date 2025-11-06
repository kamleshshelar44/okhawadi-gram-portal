const express = require('express');
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', auth, upload.array('images', 5), createProject);
router.put('/:id', auth, upload.array('images', 5), updateProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;