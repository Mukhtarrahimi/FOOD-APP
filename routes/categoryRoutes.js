const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const categoryController = require('../controllers/categoryController');
// CREATE || POST
router.post('/create', authMiddleware, categoryController.createCategory);
router.get('/getAll', categoryController.getAllCategory);
router.put('/update/:id', authMiddleware, categoryController.updateCategory);
router.delete('/delete/:id', authMiddleware, categoryController.deleteCategory);

module.exports = router;
