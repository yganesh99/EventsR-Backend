// routes/userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', userController.addUser);
router.post('/login', userController.login);
router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getUser);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;