// routes/userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');
const { authenticateToken } = require('../utils/functions');

const router = express.Router();

router.post('/register', userController.addUser);
router.post('/login', userController.login);
router.get('/users', authenticateToken, userController.getAllUsers);
router.get('/users/id/:userId', authenticateToken, userController.getUserById);
router.get(
	'/users/email/:email',
	authenticateToken,
	userController.getUserByEmail,
);
router.put('/users/:userId', authenticateToken, userController.updateUser);
router.delete('/users/:userId', authenticateToken, userController.deleteUser);

module.exports = router;
