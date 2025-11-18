const User = require('../models/userModel');
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
    // create new user
    const user = await User.create({
      username,
      email,
      password,
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

module.exports = {
  registerController,
};
