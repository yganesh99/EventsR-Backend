// models/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: false },
	contactNo: { type: String, required: true },
	addresses: [
		{
			address: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'UserAddress',
			},
		},
	],
	role: {
		type: String,
		enum: ['customer', 'admin'],
		default: 'customer',
		required: true,
	},
	dateCreated: { type: Date, default: Date.now },
	dateModified: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
