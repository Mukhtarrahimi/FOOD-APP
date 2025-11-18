const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'username is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
  },
  address: {
    type: Array,
  },
  phone: {
    type: String,
    required: [true, 'phone is required'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  usertype: {
    type: String,
    required: [true, 'usertype is required'],
    default: 'client',
    enum: ['client', 'admin', 'vendor', 'driver'],
  },
  profile: {},
});
