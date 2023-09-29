const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  sourceableQuantity: Number,
  productCatgegories: [
    {
      productCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory' }, // Reference to the product category
    },
  ],
  type: { type: String, enum: ['purchase', 'rental'] }, // Product type,
  dateCreated: { type: Date, default: Date.now },
  dateModified: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);