const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const router = express.Router();
const User = require('../models/user');
const localMiddleware = require('../middleware/local');
// const localMiddleware = require('../middleware/local');
// const googleMiddleware = require('../middleware/google');

// ============================ ROOT ROUTE ==============================
router.get('/', (req, res) => {
	res.render('landing');
});
// =========================== REGISTER ROUTE ===========================
router.get('/register', (req, res) => {
	res.render('register');
});

// ====================== HANDLING REGISTRATION ========================
router.post('/register', localMiddleware.forwardAuthenticated, (req, res) => {
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
								console.log(`New User Has Been Created: ${newUser.name}`);
								res.redirect('/home');
							})
							.catch((error) => console.log(error));
					});
				});
			}
		});
	}
});

// ============================= HANDLE GOOGLE LOGIN =================
router.get('/register/google', (req, res) => {
	res.send('Logging in With Google');
});

// ============================ LOG_IN PAGE ============================
router.get('/login', (req, res) => {
	res.render('login');
});

// ========================== HANDLING LOGIN ================================
router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/home',
		failureRedirect: '/',
	})
);

// =========================== GOOGLE ROUTE ============================
router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile', 'email'],
	})
);

// ======================== GOOGLE CALLBACk ROUTE ======================
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
	res.redirect('/home');
});

// ===================== CHECK ====================================
router.get('/home', (req, res) => {
	res.render('home');
});

// ========================= LOGOUT ====================================
router.get('/logout', (req, res) => {
	console.log(`logging out user: ${req.user}`);
	req.logOut();
	console.log(req.session);

	res.redirect('/');
});

module.exports = router;
