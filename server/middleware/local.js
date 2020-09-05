const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/user');

const localMiddleware = {};

localMiddleware.userRegistration = (req, res) => {
	const { name, username, password } = req.body;
	const errors = [];

	if (!name || !username || !password) {
		errors.push({ msg: 'Please enter all fields' });
	}

	if (password.length < 6) {
		errors.push({ msg: 'Password must be at least 6 characters' });
	}

	if (errors.length > 0) {
		console.log(errors);
		res.render('register', {
			name,
			username,
			password,
		});
	} else {
		User.findOne({ username: username }).then((user) => {
			if (user) {
				console.log('User Already Exists');
				res.render('register', {
					errors,
					name,
					username,
					password,
				});
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
								console.log('New User Has Been Created');
								res.redirect('/home');
							})
							.catch((error) => console.log(error));
					});
				});
			}
		});
	}
};

localMiddleware.login = passport.authenticate('local', {
	successRedirect: '/home',
	failureRedirect: '/login',
});

localMiddleware.forwardAuthenticated = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return next();
	}
	console.log('User is already Signed in');
	return res.redirect('/home');
};

module.exports = localMiddleware;
