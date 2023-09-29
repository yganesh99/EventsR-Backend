const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: String,
  contactNo: String,
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Reference to the product in the order
      quantity: Number,
    },
  ],
  dateCreated: { type: Date, default: Date.now },
  dateModified: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Supplier', supplierSchema);