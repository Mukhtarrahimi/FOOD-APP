const Food = require('../models/foodModel');
const Order = require('../models/orderModel');

// CREATE FOOD
const createFood = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;

    // Validation
    if (!title || !description) {
      return res.status(400).send({
        success: false,
        message: 'Title and Description are required',
      });
    }

    // Create Food
    const food = await Food.create({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    });

    return res.status(201).send({
      success: true,
      message: 'Food created successfully',
      food,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: 'Error in Create Food API',
      error: err.message,
    });
  }
};

// GET ALL FOOD
const getAllFood = async (req, res) => {
  try {
    const foods = await Food.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: 'Not Food Available',
      });
    }
    res.status(201).send({
      success: true,
      message: 'All Food Get successfully',
      foods,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Error in Get All Food API',
      error: err.message,
    });
  }
};

// UPDATE FOOD
const updateFood = async (req, res) => {
  try {
    const foodId = req.params.id;

    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;

    // Validation
    if (!title || !description) {
      return res.status(400).send({
        success: false,
        message: 'Title and Description are required',
      });
    }

    const editeFood = await Food.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
        ratingCount,
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: 'Food updated successfully',
      editeFood,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: 'Error in Update Food API',
      error: err.message,
    });
  }
};

// DELETE FOOD
const deleteFood = async (req, res) => {
  try {
    const foodId = req.params.id;

    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: 'Food not found',
      });
    }

    await Food.findByIdAndDelete(foodId);

    return res.status(200).send({
      success: true,
      message: 'Food deleted successfully',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: 'Error in Delete Food API',
      error: err.message,
    });
  }
};

// ORDER
const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { restaurant, foods, deliveryAddress, paymentMethod } = req.body;

    // Validation
    if (!restaurant || !foods || foods.length === 0 || !deliveryAddress) {
      return res.status(400).send({
        success: false,
        message: 'Please provide restaurant, foods, and delivery address',
      });
    }

    let totalPrice = 0;
    const orderFoods = [];

    for (let item of foods) {
      const foodItem = await Food.findById(item.food);
      if (!foodItem) {
        return res.status(404).send({
          success: false,
          message: `Food with ID ${item.food} not found`,
        });
      }

      const price = parseFloat(foodItem.price) * item.quantity;
      totalPrice += price;

      orderFoods.push({
        food: foodItem._id,
        quantity: item.quantity,
        price: price,
      });
    }

    const newOrder = await Order.create({
      buyer: userId,
      restaurant,
      foods: orderFoods,
      totalPrice,
      deliveryAddress,
      payment: {
        status: 'pending',
        method: paymentMethod || 'cash',
      },
      orderCode: `ORD-${Date.now()}`,
    });

    return res.status(201).send({
      success: true,
      message: 'Order placed successfully',
      order: newOrder,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: 'Error in Order API',
      error: err.message,
    });
  }
};

// CHANGE ORDER STATUS
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: 'Please Provide valid order id',
      });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: 'Order Status Updated',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error In Order Status API',
      error,
    });
  }
};

module.exports = {
  createFood,
  getAllFood,
  updateFood,
  deleteFood,
  placeOrder,
  orderStatusController,
};
