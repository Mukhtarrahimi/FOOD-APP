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

// UPDATE CATEGORY
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { title, imageUrl } = req.body;

    // Validation
    if (!title) {
      return res.status(400).send({
        success: false,
        message: 'Please provide title',
      });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { title, imageUrl },
      { new: true } // ← مقدار جدید را برگردان
    );

    if (!updatedCategory) {
      return res.status(404).send({
        success: false,
        message: 'Category not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Category updated successfully',
      category: updatedCategory,
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

module.exports = {
  createCategory,
  updateCategory,
};
