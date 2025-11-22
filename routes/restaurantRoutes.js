const express = require('express');
const router = express.Router();
const restautrantController = require('../controllers/restaurantControllers');
const authMiddleware = require('../middleware/authMiddleware');
// CREAT || POST
router.post('/create', authMiddleware, restautrantController.createRestaurant);
// GET
router.get('/getAll', restautrantController.getAllRestaurant);

module.exports = router;
