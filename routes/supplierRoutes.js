// routes/supplierRoutes.js

const express = require('express');
const supplierController = require('../controllers/supplierController');

const router = express.Router();

router.post('/suppliers', supplierController.addSupplier);
router.get('/suppliers', supplierController.getAllSuppliers);
router.get('/suppliers/:supplierId', supplierController.getSupplier);
router.get('/suppliers/:supplierId/products', supplierController.getSupplierWithProducts);
router.put('/suppliers/:supplierId', supplierController.updateSupplier);
router.delete('/suppliers/:supplierId', supplierController.deleteSupplier);

module.exports = router;