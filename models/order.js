const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who placed the order
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Reference to the product in the order
      quantity: Number,
    },
  ],
  status: { type: String, enum: ['pending', 'shipped', 'delivered', 'returned'] },
  // Other order-related fields (e.g., shipping address, rental period)
  shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress' },
  totalAmount: Number,
  orderDate: { type: Date, default: Date.now },
  dateCreated: { type: Date, default: Date.now },
  dateModified: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);