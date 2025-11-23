const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const categoryController = require('../controllers/categoryController');
// CREATE || POST
router.post('/create', authMiddleware, categoryController.createCategory);
router.put('/update/:id', authMiddleware, categoryController.updateCategory);

module.exports = router;
