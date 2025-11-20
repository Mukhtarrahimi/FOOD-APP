const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

// REGISTER CONTROLLER
const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address, answer } = req.body;

    // validation
    if (!username || !email || !password || !phone || !address || !answer) {
      return res.status(400).send({
        success: false,
        message: 'Please Provide All Fields',
      });
    }

    // check email
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).send({
        success: false,
        message: 'Email Already Registered, Please Login',
      });
    }

    // password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });

    res.status(201).send({
      success: true,
      message: 'Successfully Registered',
      userId: user._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: 'Error In Register API',
      err,
    });
  }
};

// LOGIN CONTROLLER
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: 'Please Provide Email and Password',
      });
    }

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User Not Found',
      });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: 'Invalid Credentials',
      });
    }

    // make token JWT
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // remove password
    user.password = undefined;

    res.status(200).send({
      success: true,
      message: 'Login Successful',
      token,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: 'Error In Login API',
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

module.exports = {
  registerController,
  loginController,
};
