// controllers/userController.js

const ProductCategory = require('../models/productCategory');

const addProductCategory = async (req, res) => {
  try {
    const productCategory = new ProductCategory(req.body);
    await productCategory.save();
    res.status(201).json(productCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllProductCategories = async (req, res) => {
  try {
    const productCategories = await ProductCategory.find();
    res.json(productCategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProductCategory = async (req, res) => {
  try {
    const productCategory = await ProductCategory.findById(req.params.productCategoryId);
    if (!productCategory) {
      return res.status(404).json({ error: 'Product Category not found' });
    }
    res.json(productCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProductCatgeory = async (req, res) => {
  try {
    const productCategory = await ProductCategory.findByIdAndUpdate(req.params.productCategoryId, req.body, { new: true });
    if (!productCategory) {
      return res.status(404).json({ error: 'Product Category not found' });
    }
    res.json(productCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProductCategory = async (req, res) => {
  try {
    const productCategory = await ProductCategory.findByIdAndRemove(req.params.productCategoryId);
    if (!productCategory) {
      return res.status(404).json({ error: 'Product Category not found' });
    }
    res.json({ message: 'Product Category deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = {
  addProductCategory,
  getAllProductCategories,
  getProductCategory,
  updateProductCatgeory,
  deleteProductCategory,
};