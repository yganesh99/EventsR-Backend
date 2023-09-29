// models/productCategory.js

const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  dateCreated: { type: Date, default: Date.now },
  dateModified: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ProductCategory', productCategorySchema);