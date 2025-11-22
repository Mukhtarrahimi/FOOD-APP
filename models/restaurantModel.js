const mongoose = require('mongoose');
const restaurantSchema = mongoose.Schema(
  {
    title: {
      type: true,
      required: [true, 'Restaurant Title is Required'],
    },
    imageUrl: {
      type: String,
      default: '',
    },
    foods: {
      type: Array,
    },
    times: {
      type: String,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: String,
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
    code: {
      type: String,
    },

    coords: {
      id: { type: String },
      latidude: { type: Number },
      latidudeDelta: { type: Number },
      longitude: { type: Number },
      longitudeDelta: { type: Number },
      address: { type: String },
      title: { type: String },
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model('Restaurant', restaurantSchema);
