const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    foods: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food',
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    payment: {
      status: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
      },
      method: { type: String },
      transactionId: { type: String },
    },
    status: {
      type: String,
      enum: ['preparing', 'on the way', 'delivered'],
      default: 'preparing',
    },
    deliveryAddress: { type: String, required: true },
    orderCode: { type: String, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
