/* eslint-disable no-underscore-dangle */
const express = require('express');

const router = express.Router();
const User = require('../models/user');
const Driver = require('../models/driver');

// const localMiddleware = require('../middleware/local');
const auth = require('../middleware/jwt');
// const googleMiddleware = require('../middleware/google');

// ====================== Driver REGISTRATION ========================
router.post('/register/driver', auth, async (req, res) => {
	User.findById(req.user)
		.then((foundUser) => {
			console.log('user Has Been Found!');
			if (foundUser.role === 'driver') {
				const { dependants, address, sex } = req.body;
				const newDriver = new Driver({
					dependants: dependants,
					sex: sex,
					address: address,
				});
				const savedDriver = newDriver.save();
				User.findByIdAndUpdate(
					req.user,
					{ details: savedDriver._id },
					{ new: true }
				)
					.then((updatedUser) => {
						return res.json({
							success: true,
							Driver: { user: updatedUser, Driver: savedDriver },
						});
					})
					.catch((err) => {
						console.log(err);
						return res.status(400).json('Error Upading user');
					});
			} else {
				res
					.status(400)
					.json({ msg: 'You Need to Sign-In as a Driver to do that' });
			}
		})
		.catch((err) => {
			console.log(err);
			return res.status(400).json({ success: false, error: err });
		});
});

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
const { dependants, address, sex } = req.body;
	const newDriver = new Driver({
		dependants: dependants,
		sex: sex,
		address: address,
	});
	const savedDriver = await newDriver.save();
	return res.json({ success: true, Driver: { user: req.user, savedDriver } });
	*/
