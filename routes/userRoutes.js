const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/getUser', authMiddleware, userController.getUser);
router.put('/updateUser', authMiddleware, userController.updateProfile);
router.post('/resetPassword', authMiddleware, userController.resetPassword);

module.exports = router;
