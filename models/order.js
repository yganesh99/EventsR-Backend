// models/order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, }, // Reference to the user who placed the order
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, }, // Reference to the product in the order
      quantity: {type: Number, required: true,},
    },
  ],
  status: { type: String, enum: ['pending', 'completed', 'returned'], required: true },
  // Other order-related fields (e.g., shipping address, rental period)
  shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress', required: true, },
  totalAmount: {
    type: Number,
    required: true,
  },
  orderDate: { type: Date, default: Date.now },
  dateCreated: { type: Date, default: Date.now },
  dateModified: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);