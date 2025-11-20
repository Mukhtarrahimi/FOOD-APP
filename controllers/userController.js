const User = require('../models/userModel');

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

module.exports = {
  getUser,
  updateProfile,
};
