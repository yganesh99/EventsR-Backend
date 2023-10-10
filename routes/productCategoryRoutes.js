// routes/productCategoryRoutes.js

const express = require('express');
const productCategoryController = require('../controllers/productCategoryController');

const router = express.Router();

router.post(
	'/product-categories',
	productCategoryController.addProductCategory,
);
router.get(
	'/product-categories',
	productCategoryController.getAllProductCategories,
);
router.get(
	'/product-categories/:productCategoryId',
	productCategoryController.getProductCategory,
);
router.put(
	'/product-categories/:productCategoryId',
	productCategoryController.updateProductCatgeory,
);
router.delete(
	'/product-categories/:productCategoryId',
	productCategoryController.deleteProductCategory,
);

module.exports = router;
