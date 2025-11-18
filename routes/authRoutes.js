const express = require('express');
const router = express.Router();
const authController = require('./controllers/authControllers');

// register || post
router.post('/register', authController.registerCroller);

module.exports = router;
