// Middleware to check if the request has a valid token
const authenticateToken = (req, res, next) => {
	const jwt = require('jsonwebtoken');
	const JWT_SECRET = process.env.JWT_SECRET;
	const token = req.header('Authorization');
	if (!token) {
		return res.status(400).json({
			error: `Not authorized. Provide a authorization token in request`,
		});
	}

	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(400).json({
				error: `Invalid Token`,
			});
		}
		req.user = user;
		next();
	});
};

module.exports = {
	authenticateToken,
};
