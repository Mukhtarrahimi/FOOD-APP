const User = require('../models/userModel');

const getUser = async (req, res) => {
  try {
    // find user
    const user = await User.findById({ _id: req.body.id });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User Not Found!',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Error In Get User API',
      err,
    });
  }
};

module.exports = {
  getUser,
};
