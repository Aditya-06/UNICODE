const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const localMiddleware = {};

localMiddleware.userRegistration = async (req, res) => {
	console.log(req.body);

	const { name, username, password, password2 } = req.body;
	const errors = [];

	if (!name || !username || !password) {
		errors.push({ msg: 'Please enter all fields' });
	}

	if (password.length < 6) {
		errors.push({ msg: 'Password must be at least 6 characters' });
	}

	if (password !== password2) {
		errors.push({ msg: 'Passwords Do Not Match' });
	}

	if (errors.length > 0) {
		console.log(errors);
		res.status(400).json({ error: errors });
	} else {
		await User.findOne({ username: username }).then((user) => {
			if (user) {
				console.log('User Already Exists');
				res.json({ message: 'User Already Exists' });
			} else {
				const newUser = new User({
					name,
					username,
					password,
				});

				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (er, hash) => {
						if (er) throw er;
						newUser.password = hash;
						newUser
							.save()
							.then(() => {
								console.log(`New User Has Been Created: ${newUser.name}`);
								res.json({ message: 'User Has Been Registered!' });
							})
							.catch((error) => console.log(error));
					});
				});
			}
		});
	}
};

localMiddleware.login = (req, res) => {
	passport.authenticate('local', { session: false }, (err, user) => {
		const { username, password } = req.body;
		if (!username || !password) {
			return res.status(400).json({ error: 'Please Enter All Fields' });
		}
		if (!user) {
			return res.status(400).json({ error: 'Incorrect Username/Password' });
		}
		req.logIn(user, { session: false }, (error) => {
			if (error) {
				return res.status(400).json({ error: error });
			}
			// eslint-disable-next-line no-underscore-dangle
			const token = jwt.sign({ id: user._id }, process.env.JWT_secret);
			console.log(token);
			return res.json({ message: 'User Successfully Logged In!' });
		});
	})(req, res);
};

localMiddleware.forwardAuthenticated = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return next();
	}
	console.log('User is already Signed in');
	return res.redirect('/home');
};

localMiddleware.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.redirect('/login');
};

module.exports = localMiddleware;
