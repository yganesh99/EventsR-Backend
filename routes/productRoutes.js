// routes/productRoutes.js

const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/products', productController.addProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:productId', productController.getProduct);
router.put('/products/:productId', productController.updateProduct);
router.delete('/products/:productId', productController.deleteProduct);

module.exports = router;
