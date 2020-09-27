const express = require('express');
const passport = require('passport');

const router = express.Router();
const User = require('../models/user');
// const localMiddleware = require('../middleware/local');
const jwtConfig = require('../config/jwt-config');
const auth = require('../middleware/jwt');
// const googleMiddleware = require('../middleware/google');

// ============================ ROOT ROUTE ==============================
router.get('/', (req, res) => {
	res.json({ message: 'Welcome to Uber Clone' });
});

// ====================== HANDLING REGISTRATION ========================
router.post('/register', jwtConfig.register);

// ============================= HANDLE GOOGLE LOGIN =================
router.get('/register/google', (req, res) => {
	res.send('Logging in With Google');
});

// ========================== HANDLING LOGIN ================================
router.post('/login', jwtConfig.login);

// =========================== GOOGLE ROUTE ============================
router.get(
	'/google',
	passport.authenticate('google', {
		session: false,
		scope: ['profile', 'email'],
	})
);

// ======================== GOOGLE CALLBACk ROUTE ======================
router.get(
	'/google/redirect',
	passport.authenticate('google', { session: false }),
	jwtConfig.googleValid,
	(req, res) => {
		return res.redirect('http://localhost:3000/home');
	}
);

// ===================== CHECK ====================================
router.get('/home', auth, async (req, res) => {
	const loggedUser = await User.findById(req.user);
	// console.log(loggedUser);
	res.json({ message: `Welcome ${loggedUser.name}` });
});

router.post('/isValid', jwtConfig.isValid, (req, res) => {
	res.json(true);
});

// ============= USER ==================
router.get('/user', auth, async (req, res) => {
	const loggedUser = await User.findById(req.user);
	res.json({
		id: loggedUser.id,
		Name: loggedUser.name,
	});
});

// ========================= LOGOUT ====================================
router.get('/user/:id/logout', (req, res) => {
	console.log(`logging out user: ${req.user}`);
	req.logOut();
	console.log(req.session);

	res.json({ msg: 'User Has Been Logged Out!' });
});

// ========================= USER EDIT ===============================
router.put('/user/:id/edit', auth, (req, res) => {
	User.find({ username: req.body.username }, (err, result) => {
		if (err) {
			console.log(err);
			res.json((error) => res.json(error));
		} else if (result.length === 1) {
			User.findByIdAndUpdate(
				req.params.id,
				{
					name: req.body.name,
					usernam: req.body.username,
				},
				{ new: true }
			)
				.then((editedUser) => {
					res.json(editedUser);
				})
				.catch((eror) => res.json(eror));
		} else {
			res.json({ msg: 'User With That Email Already Exists!' });
		}
	});
});

module.exports = router;
