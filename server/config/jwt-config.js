/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const jwtConfig = {};

jwtConfig.register = async (req, res) => {
	try {
		let { username, password, password2, type, contact, name } = req.body;

		// validate

		if (!username || !password || !password2 || !type || !contact)
			return res
				.status(400)
				.json({ success: false, msg: 'Not all fields have been entered.' });
		if (password.length < 5)
			return res
				.status(400)
				.json({ msg: 'The password needs to be at least 5 characters long.' });
		if (password !== password2)
			return res.status(400).json({
				success: false,
				msg: 'Enter the same password twice for verification.',
			});

		const existingUser = await User.findOne({ username: username });
		if (existingUser)
			return res.status(400).json({
				success: false,
				msg: 'An account with this username already exists.',
			});

		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			username,
			password: passwordHash,
			role: type,
			contact: contact,
		});
		const savedUser = await newUser.save();
		res.json({ success: true, user: savedUser });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

jwtConfig.login = async (req, res) => {
	try {
		const { username, password, type } = req.body;

		// validate
		if (!username || !password)
			return res.status(400).json({ msg: 'Not all fields have been entered.' });

		const user = await User.findOne({ username: username });
		if (!user)
			return res
				.status(400)
				.json({ msg: 'No account with this username has been registered.' });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' });

		const token = jwt.sign({ id: user._id }, process.env.JWT_secret);
		res.json({
			token,
			user: {
				id: user._id,
				name: user.name,
				type: user.type,
				role: type,
			},
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

jwtConfig.delete = async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.user);
		res.json(deletedUser);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

jwtConfig.isValid = async (req, res) => {
	try {
		// const authHeader = req.headers.authorization;
		const token = req.header('x-auth-token');
		// console.log(token);
		if (!token) {
			console.log('Token Not Found');
			return res.json(false);
		}

		const verified = jwt.verify(token, process.env.JWT_secret);
		if (!verified) {
			console.log('Could Not Verify Token');
			return res.json(false);
		}

		const user = await User.findById(verified.id);
		if (!user) {
			console.log('Could Not Verify User');
			return res.json(false);
		}
		// console.log(user.name);
		return res.json(true);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = jwtConfig;
