const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const foodController = require('../controllers/foodController');
// CREATE || POST
router.post('/create', authMiddleware, foodController.createFood);
router.get('/getAll', authMiddleware, foodController.getAllFood);
module.exports = router;
