const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`monogDB connected ${conn.Connection.host}`);
  } catch (err) {
    console.log(`mongoDB Error ${err}`);
    process.exit();
  }
};

module.exports = connectDb;
