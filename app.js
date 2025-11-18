const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const connectDb = require('./config/db');

// middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

connectDb();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
