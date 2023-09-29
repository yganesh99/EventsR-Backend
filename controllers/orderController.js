// controllers/orderController.js

const Order = require('../models/order');
const Product = require('../models/product');

const addOrder = async (req, res) => {
  try {
    const { userId, products, addressId } = req.body;

    if(!userId){
      return res.status(400).json({ error: 'Id of the user who placed the order is required' });
    }

    if(!products){
      return res.status(400).json({ error: 'An array of product objects each with a product id and a quantity is required.' });
    }

    // Create an array to hold the products with quantities
    const productsWithQuantities = [];

    // Loop through the products array in the request body
    for (const { productId, quantity } of products) {
      // Find the product by its ID
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(400).json({ error: `Product with Id not found: ${productId}` });
      }

      // Add the product and quantity to the productsWithQuantities array
      productsWithQuantities.push({ product: product, quantity });
    }

    // Calculate the total order amount based on the products and quantities
    const totalAmount = productsWithQuantities.reduce(
      (total, product) => total + product.product.price * product.quantity,
      0
    );

    // Create the order with the associated products
    const order = new Order({
      user: userId,
      products: productsWithQuantities,
      totalAmount,
      status: "pending",
      shippingAddress: addressId,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOrderWithProducts = async (req, res) => {
  try {
    // Find the order by its ID
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Populate the 'products' field in the order to retrieve product details
    await order.populate('products.product');

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.orderId, req.body, { new: true });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndRemove(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = {
  addOrder,
  getAllOrders,
  getOrder,
  getOrderWithProducts,
  updateOrder,
  deleteOrder,
};