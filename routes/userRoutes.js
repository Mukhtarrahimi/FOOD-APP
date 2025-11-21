const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/getUser', authMiddleware, userController.getUser);
router.put('/updateUser', authMiddleware, userController.updateProfile);
router.post('/resetPassword', authMiddleware, userController.resetPassword);
router.post('/updatePassword', authMiddleware, userController.updatePassword);
router.delete('/deleteUser/:id', authMiddleware, userController.deleteProfile);

module.exports = router;
