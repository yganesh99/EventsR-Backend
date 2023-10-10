// routes/userAddressRoutes.js

const express = require('express');
const userAddressController = require('../controllers/userAddressController');

const router = express.Router();

router.post('/user-addresses', userAddressController.addUserAddress);
router.get(
	'/user-addresses/:userAddressId',
	userAddressController.getUserAddress,
);
router.put(
	'/user-addresses/:userAddressId',
	userAddressController.updateUserAddress,
);
router.delete(
	'/user-addresses/:userAddressId',
	userAddressController.deleteUserAddress,
);

module.exports = router;
