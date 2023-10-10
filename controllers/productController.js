// controllers/productController.js

const Product = require('../models/product');

const addProduct = async (req, res) => {
	try {
		const product = new Product(req.body);
		await product.save();
		res.status(201).json(product);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.productId);
		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}
		res.json(product);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const updateProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndUpdate(
			req.params.productId,
			req.body,
			{ new: true },
		);
		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}
		res.json(product);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndRemove(req.params.productId);
		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}
		res.json({ message: 'Product deleted' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	addProduct,
	getAllProducts,
	getProduct,
	updateProduct,
	deleteProduct,
};
