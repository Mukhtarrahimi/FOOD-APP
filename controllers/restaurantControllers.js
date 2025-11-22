const Restaurant = require('../models/restaurantModel');
const createRestaurant = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      times,
      isOpen,
      pickup,
      delivery,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    // 1. Validation
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant title is required',
      });
    }

    if (!coords || !coords.latitude || !coords.longitude) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant location (latitude & longitude) is required',
      });
    }

    // 2. Create Restaurant
    const newRestaurant = await Restaurant.create({
      title,
      imageUrl,
      foods: foods || [],
      times,
      isOpen,
      pickup,
      delivery,
      logoUrl,
      rating: rating || 0,
      ratingCount: ratingCount || 0,
      code,
      coords,
    });

    // 3. Response
    return res.status(201).json({
      success: true,
      message: 'Restaurant created successfully',
      restaurant: newRestaurant,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Server Error while creating restaurant',
      error: err.message,
    });
  }
};

// Get All
const getAllRestaurant = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: 'No Restaurant Avalibal',
      });
    }
    res.status(200).send({
      success: true,
      message: 'Restaurant Get All successfully',
      restaurants,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Error in Get All Restaurant API',
      error: err.message,
    });
  }
};

// Get Restaurant By Id
const getRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: 'Please Provide Id',
      });
    }
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: 'Restaurant Not Avalibal',
      });
    }
    res.status(200).send({
      success: true,
      message: 'Restaurant Get successfully',
      restaurant,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Error in Get Restaurant By Id API',
      error: err.message,
    });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant ID is required',
      });
    }

    const updateData = {};

    const allowedFields = [
      'title',
      'imageUrl',
      'foods',
      'times',
      'isOpen',
      'pickup',
      'delivery',
      'logoUrl',
      'rating',
      'ratingCount',
      'code',
      'coords',
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    if (updateData.coords) {
      if (!updateData.coords.latitude || !updateData.coords.longitude) {
        return res.status(400).json({
          success: false,
          message: 'Coords must include both latitude and longitude',
        });
      }
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      updateData,
      { new: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Restaurant updated successfully',
      restaurant: updatedRestaurant,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: 'Error updating restaurant',
      error: err.message,
    });
  }
};

// DELETE RESTAURANT
const deleteRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: 'Please Provide Id',
      });
    }
    await Restaurant.findByIdAndDelete(restaurantId);
    res.status(200).send({
      success: true,
      message: 'Restaurant Delete successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Error in Delete API',
      error: err.message,
    });
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurant,
  getRestaurant,
  deleteRestaurant,
  updateRestaurant,
};
