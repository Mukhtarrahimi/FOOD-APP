const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
// RIGESTER
const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;
    // validation
    if (!username || !email || !password || !phone || !address) {
      return res.status(500).send({
        success: false,
        message: 'Please Provide All Feilds',
      });
    }
    // cheack user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: 'Email Already Registered Please Login',
      });
    }
    // hashing  password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      address,
      phone,
    });
    res.status(201).send({
      success: true,
      message: 'Successfully Registered',
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Error In Register API',
      err,
    });
  }
};

// LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!password || !email) {
      return res.status(404).send({
        success: false,
        message: 'Please Provide Email or Password',
      });
    }
    const user = await User.findOne({ email }, { password: 0 });
    // cheack
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
        message: 'invalide creditional',
      });
    }
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    user.password = undefined;
    res.status(201).send({
      success: true,
      message: 'Login Successfully',
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Error In Login API',
      err,
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
