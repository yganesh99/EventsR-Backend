// models/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: String,
  contactNo: String,
  addresses: [
    {
      address: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress' },
    },
  ],
  role: { type: String, enum: ['customer', 'admin'], default: 'customer', required: true },
  dateCreated: { type: Date, default: Date.now },
  dateModified: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);