const express = require('express');
const router = express.Router();
const restautrantController = require('../controllers/restaurantControllers');
const authMiddleware = require('../middleware/authMiddleware');
// CREAT || POST
router.post('/create', authMiddleware, restautrantController.createRestaurant);
// GET
router.get('/getAll', restautrantController.getAllRestaurant);
router.get('/get/:id', restautrantController.getRestaurant);
// DELETE
router.delete(
  '/delete/:id',
  authMiddleware,
  restautrantController.deleteRestaurant
);
// UPDATE
router.put('/edit/:id', authMiddleware, restautrantController.updateRestaurant);

module.exports = router;
