// routes/userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Route for getting all users
router.get('/users', userController.getAllUsers);

module.exports = router;