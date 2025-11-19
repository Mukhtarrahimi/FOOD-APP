// const User = require('../models/userModel');
const getUser = async (req, res) => {
  try {
    res.send('User Data');
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'server error',
      err,
    });
  }
};

module.exports = {
  getUser,
};
