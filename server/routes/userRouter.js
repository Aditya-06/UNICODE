/* eslint-disable no-underscore-dangle */
const express = require('express');
const passport = require('passport');

const router = express.Router();
const User = require('../models/user');
const Customer = require('../models/customer');

// const localMiddleware = require('../middleware/local');
const jwtConfig = require('../config/jwt-config');
const auth = require('../middleware/jwt');
// const googleMiddleware = require('../middleware/google');

// ====================== Driver REGISTRATION ========================
router.post('/register/user', auth, async (req, res) => {
	User.findById(req.user)
		.then((foundUser) => {
			console.log('user Has Been Found!');
			if (foundUser.role === 'customer') {
				const newCust = new Customer({ city: 'Mumbai' });
				console.log(newCust);
				const savedCust = newCust.save();
				console.log(savedCust);
				User.findByIdAndUpdate(
					req.user,
					{ details: newCust._id },
					{ new: true }
				)
					.then((updatedUser) => {
						return res.json({
							success: true,
							Customer: { user: updatedUser, customer: newCust },
						});
					})
					.catch((err) => {
						console.log(err);
						res.status(400).json('Error Upading user');
					});
			} else {
				res
					.status(400)
					.json({ msg: 'You Need to Sign-In as a Customer to do that' });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json({ success: false, error: err });
		});
});

// ============================= HANDLE GOOGLE LOGIN =================
router.get('/register/google', (req, res) => {
	res.send('Logging in With Google');
});

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

router.post('/isValid', jwtConfig.isValid);

// ============= USER ==================
router.get('/user', auth, async (req, res) => {
	const loggedUser = await User.findById(req.user);
	res.json({
		id: loggedUser.id,
		Name: loggedUser.name,
		Type: loggedUser.type,
	});
});

// ========================= LOGOUT ====================================
router.get('/logout', (req, res) => {
	console.log(`logging out user: ${req.user}`);
	req.logOut();
	console.log(req.session);

	res.json({ msg: 'User Has Been Logged Out!' });
});

module.exports = router;

/*
User.findById(req.user)
		.then((foundUser) => {
			const newCust = new Customer({ city: 'Mumbai' })
				.then(() => {
					const savedCust = newCust.save();
					return res.json({
						success: true,
						Customer: { user: foundUser, savedCust },
					});
				})
				.catch((err) => {
					console.log(err);
					return res.json({ success: false, msg: 'User Not Found' });
				});
		})
		.catch((err) => {
			return res.status(400).json({ success: false, error: err });
		});
*/
