const Category = require('../models/categoryModel');

const createCategory = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).send({
        success: false,
        message: 'Please provide title and imageUrl',
      });
    }

    await Category.create({
      title,
      imageUrl,
    });

    res.status(200).send({
      success: true,
      message: 'Category created successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Error in createCategory API',
      error: err.message,
    });
  }
};

module.exports = {
  createCategory,
};
