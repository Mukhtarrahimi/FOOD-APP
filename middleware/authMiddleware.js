const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: 'Authorization header missing',
      });
    }
    const token = authHeader.split(' ')[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: 'Un-Authorized User',
          err,
        });
      } else {
        req.user = decode; // تغییر اعمال شده به جای req.body.id
        next();
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Error In Auth API',
      err,
    });
  }
};
