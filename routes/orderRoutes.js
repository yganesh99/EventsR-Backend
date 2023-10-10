// routes/orderRoutes.js

const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post('/orders', orderController.addOrder);
router.get('/orders', orderController.getAllOrders);
router.get('/orders/:orderId', orderController.getOrder);
router.get('/orders/:orderId/products', orderController.getOrderWithProducts);
router.put('/orders/:orderId', orderController.updateOrder);
router.delete('/orders/:orderId', orderController.deleteOrder);

module.exports = router;
