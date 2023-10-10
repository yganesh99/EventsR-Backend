// controllers/supplierController.js

const Supplier = require('../models/supplier');

const addSupplier = async (req, res) => {
	try {
		const supplier = new Supplier(req.body);
		await supplier.save();
		res.status(201).json(supplier);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const getAllSuppliers = async (req, res) => {
	try {
		const suppliers = await Supplier.find();
		res.json(suppliers);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getSupplier = async (req, res) => {
	try {
		const supplier = await Supplier.findById(req.params.supplierId);
		if (!supplier) {
			return res.status(404).json({ error: 'Supplier not found' });
		}
		res.json(supplier);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getSupplierWithProducts = async (req, res) => {
	try {
		// Find the supplier by its ID
		const supplier = await Supplier.findById(req.params.supplierId);
		if (!supplier) {
			return res.status(404).json({ error: 'Supplier not found' });
		}

		// Populate the 'products' field in the supplier to retrieve product details
		await supplier.populate('products.product');

		res.json(supplier);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const updateSupplier = async (req, res) => {
	try {
		const supplier = await Supplier.findByIdAndUpdate(
			req.params.supplierId,
			req.body,
			{ new: true },
		);
		if (!supplier) {
			return res.status(404).json({ error: 'Supplier not found' });
		}
		res.json(supplier);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteSupplier = async (req, res) => {
	try {
		const supplier = await Supplier.findByIdAndRemove(
			req.params.supplierId,
		);
		if (!supplier) {
			return res.status(404).json({ error: 'Supplier not found' });
		}
		res.json({ message: 'Supplier deleted' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	addSupplier,
	getAllSuppliers,
	getSupplier,
	getSupplierWithProducts,
	updateSupplier,
	deleteSupplier,
};
