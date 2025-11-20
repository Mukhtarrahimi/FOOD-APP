const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
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
    profile: {
      type: String,
      default:
        'https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/user-244.png',
    },
    answer: {
      type: String,
      required: [true, 'Answer is required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
