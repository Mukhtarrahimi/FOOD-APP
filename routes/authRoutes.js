const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// register || post
router.post('/register', authController.registerController);
// login || post
router.post('/login', authController.loginController);
module.exports = router;
