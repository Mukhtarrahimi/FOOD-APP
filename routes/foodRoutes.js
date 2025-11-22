const express = require('mongoose');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const foodController = require('../controllers/foodController');
// CREATE || POST
router.post('/create', authMiddleware, foodController.createFood);
module.exports = router;
