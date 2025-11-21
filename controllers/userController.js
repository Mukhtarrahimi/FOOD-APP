const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const getUser = async (req, res) => {
  try {
    // find user
    const user = await User.findById(req.user.id);
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User Not Found!',
      });
    }
    // hind password
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: 'Get User Successfully',
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Error In Get User API',
      err,
    });
  }
};

// update profile

const updateProfile = async (req, res) => {
  try {
    // find user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User Not Found',
      });
    }
    // update
    const { username, password, phone } = req.body;
    if (username) user.username = username;
    if (password) user.password = password;
    if (phone) user.phone = phone;
    // save user
    await user.save();
    res.status(200).send({
      success: true,
      message: 'User Update Successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Error In Update User Profile',
      err,
    });
  }
};

// RESSET PASSWORD
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: 'Please Provide All Fields',
      });
    }
    const user = await User.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User Not Found',
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: 'Password Reset Successful',
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Error in Rest Password API',
      err,
    });
  }
};

// UPDATE PASSWORD
const updatePassword = async (req, res) => {
  try {
    // get user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User Not found!',
      });
    }
    // validation
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: 'Please Provide All Fields',
      });
    }
    const isMatch = await bcrypt.compare(oldPassword, newPassword);
    if(!isMatch){
      return res.status(500).send({
        success: false,
        message: "Old Password or New Password Not Match";
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Update Password User API',
      err,
    });
  }
};

module.exports = {
  getUser,
  updateProfile,
  resetPassword,
};
