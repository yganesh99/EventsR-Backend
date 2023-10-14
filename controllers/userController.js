// controllers/userController.js

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const addUser = async (req, res) => {
	try {
		const exisitngUser = await User.find({ email: req.body.email });

		if (exisitngUser.length > 0) {
			return res.status(400).json({
				error: `User with email ${req.body.email} already exists.`,
			});
		}

		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		// Create a new user object with the hashed password
		const user = new User({
			...req.body,
			password: hashedPassword,
		});

		// Save the user to the database
		await user.save();

		res.status(201).json(user);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const login = async (req, res) => {
	if (!req.body.email) {
		return res
			.status(400)
			.json({ error: 'Invalid request. The request requires a email.' });
	}

	if (!req.body.password) {
		return res.status(400).json({
			error: 'Invalid request. The request requires a password.',
		});
	}

	const user = await User.findOne({ email: req.body.email });

	if (user == null) {
		return res.status(400).json({ error: 'User not found' });
	}

	try {
		if (await bcrypt.compare(req.body.password, user.password)) {
			const accessToken = jwt.sign({ user }, JWT_SECRET);
			res.json({
				accessToken,
				name: user.firstName + ' ' + user.lastName,
				email: user.email,
			});
		} else {
			res.status(401).json({ error: 'Incorrect password' });
		}
	} catch (err) {
		res.status(500).json({ error: `Internal Server Error: ${err}` });
	}
};

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.userId);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getUserByEmail = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.params.email });
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const updateUser = async (req, res) => {
	try {
		const { userId } = req.params;
		const { password, ...updateData } = req.body;

		// If the request body contains a password, hash it
		if (password) {
			const hashedPassword = await bcrypt.hash(password, 10);
			updateData.password = hashedPassword;
		}

		const user = await User.findByIdAndUpdate(userId, updateData, {
			new: true,
		});

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndRemove(req.params.userId);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.json({ message: 'User deleted' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	addUser,
	login,
	getAllUsers,
	getUserById,
	getUserByEmail,
	updateUser,
	deleteUser,
};
