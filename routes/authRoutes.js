const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// register || post
router.post('/register', authController.registerController);

module.exports = router;
