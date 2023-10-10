// models/supplier.js

const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
	name: String,
	contactNo: String,
	products: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
				required: true,
			}, // Reference to the product in the order
			quantity: { type: Number, required: true },
		},
	],
	dateCreated: { type: Date, default: Date.now },
	dateModified: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Supplier', supplierSchema);
