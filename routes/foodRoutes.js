const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const foodController = require('../controllers/foodController');
// CREATE || POST
router.post('/create', authMiddleware, foodController.createFood);
router.get('/getAll', authMiddleware, foodController.getAllFood);
router.put('/update/:id', authMiddleware, foodController.updateFood);
router.delete('/delete/:id', authMiddleware, foodController.deleteFood);
// ORDER
router.post('/placeorder', authMiddleware, foodController.placeOrder);
// ORDER STATUS
router.post(
  '/orderStatus/:id',
  authMiddleware,
  adminMiddleware,
  foodController.orderStatusController
);

module.exports = router;
