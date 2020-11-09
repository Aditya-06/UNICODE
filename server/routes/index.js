const express = require('express');
const passport = require('passport');

const router = express.Router();
const User = require('../models/user');
// const localMiddleware = require('../middleware/local');
const jwtConfig = require('../config/jwt-config');
const auth = require('../middleware/jwt');
const jwtControl = require('../controllers/jwt_auth');
// const googleMiddleware = require('../middleware/google');

// ============================ ROOT ROUTE ==============================
router.get('/', (req, res) => {
	res.json({ message: 'Welcome to Uber Clone' });
});

// ====================== HANDLING REGISTRATION ========================
router.post('/register', jwtControl.register);

// ============================= HANDLE GOOGLE LOGIN =================
router.get('/register/google', (req, res) => {
	res.send('Logging in With Google');
});

// ========================== HANDLING LOGIN ================================
router.post('/login', jwtControl.login);

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
router.get('/home', auth, async (req, res) => {
	const loggedUser = await User.findById(req.user);
	// console.log(loggedUser);
	res.json({ message: `Welcome ${loggedUser.name}` });
});

router.post('/isValid', jwtConfig.isValid);

// ============= USER ==================
router.get('/user', auth, async (req, res) => {
	const loggedUser = await User.findById(req.user);
	res.json({
		id: loggedUser.id,
		Name: loggedUser.name,
	});
});

// ================= Get Info =================================
router.get('/getInfo', auth, (req, res) => {
	User.findById(req.user)
		.then((foundUser) => {
			const { name, username, role, contact } = foundUser;
			res.json({ name: name, email: username, contact: contact, role: role });
		})
		.catch((error) => {
			res.status(400).json({ msg: error });
		});
});

// ========================= LOGOUT ====================================
router.get('/logout', (req, res) => {
	console.log(`logging out user: ${req.user}`);
	req.logOut();
	console.log(req.session);

	res.json({ msg: 'User Has Been Logged Out!' });
});

// ====================== Update Profile ==========================
router.put('/user/:id', auth, (req, res) => {
	User.findByIdAndUpdate(
		req.user,
		{
			name: req.body.name,
			username: req.body.username,
			contact: req.body.contact,
		},
		{ new: true }
	)
		.then((updatedUser) => {
			console.log('User Has Been Updated!');
			res.json(updatedUser);
		})
		.catch((error) => res.json(error));
});

module.exports = router;
