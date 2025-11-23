const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'description is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    default:
      'https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png',
  },
  foodTags: {
    type: String,
    trim: true,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
  },
  code: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  restaurant: {
    type: mongoose.Schema.ObjectId,
    ref: 'Restaurant',
  },
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Foods', foodSchema);
