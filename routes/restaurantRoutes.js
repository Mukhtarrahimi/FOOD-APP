const express = require('express');
const router = express.Router();
const restautrantController = require('../controllers/restaurantControllers');
const authMiddleware = require('../middleware/authMiddleware');
// CREAT
router.post('/create', authMiddleware, restautrantController.createRestaurant);

module.exports = router;
