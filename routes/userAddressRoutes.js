// routes/userAddressRoutes.js

const express = require('express');
const userAddressController = require('../controllers/userAddressController');

const router = express.Router();

router.post('/userAddresses', userAddressController.addUserAddress);
router.get('/userAddresses/:userAddressId', userAddressController.getUserAddress);
router.put('/userAddresses/:userAddressId', userAddressController.updateUserAddress);
router.delete('/userAddresses/:userAddressId', userAddressController.deleteUserAddress);

module.exports = router;