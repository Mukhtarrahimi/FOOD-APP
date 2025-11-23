const Category = require('../models/categoryModel');

// CREATE CATEGORY
const createCategory = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    if (!title) {
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

// GET ALL CATEGORY
const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: 'Not avalibal categories',
      });
    }
    res.status(200).send({
      success: true,
      message: 'All Category Get successfully',
      categories,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Error in Get All Category API',
      error: err.message,
    });
  }
};

// UPDATE CATEGORY
const updateCategory = async (req, res) => {
  try {
    console.log('BODY:', req.body);
    const categoryId = req.params.id;
    const { title, imageUrl } = req.body;

    // Validation
    if (!title) {
      return res.status(400).send({
        success: false,
        message: 'Please provide title',
      });
    }

    const editCategory = await Category.findByIdAndUpdate(
      categoryId,
      { title, imageUrl },
      { new: true }
    );

    if (!editCategory) {
      return res.status(404).send({
        success: false,
        message: 'Category not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Category updated successfully',
      editCategory,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Error in Update Category API',
      error: err.message,
    });
  }
};

// DELETE CATEGORY
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    await Category.findByIdAndDelete(categoryId);
    res.status(200).send({
      success: true,
      message: 'Category Delete successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Error in Delete Categroy API',
      error: err.message,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};
