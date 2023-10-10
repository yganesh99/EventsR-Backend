// controllers/userController.js

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const addUser = async (req, res) => {
	try {
		const exisitngUser = await User.find({ email: req.body.email });

		if (exisitngUser.length > 0) {
			return res
				.status(400)
				.send(`User with email ${req.body.email} already exists.`);
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
			.send('Invalid request. The request requires a email.');
	}

	if (!req.body.password) {
		return res
			.status(400)
			.send('Invalid request. The request requires a password.');
	}

	const user = await User.findOne({ email: req.body.email });

	if (user == null) {
		return res.status(400).send('User not found');
	}

	try {
		if (await bcrypt.compare(req.body.password, user.password)) {
			const accessToken = jwt.sign({ user }, JWT_SECRET);
			res.json({ accessToken });
		} else {
			res.status(401).send('Incorrect password');
		}
	} catch (err) {
		res.status(500).send(`Internal Server Error: ${err}`);
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

const getUser = async (req, res) => {
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

const updateUser = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
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
	getUser,
	updateUser,
	deleteUser,
};
