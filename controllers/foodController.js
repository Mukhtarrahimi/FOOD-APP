const Food = require('../models/foodModel');

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

module.exports = { createFood, getAllFood };
