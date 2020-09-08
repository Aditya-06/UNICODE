const express = require('express');
const passport = require('passport');

const router = express.Router();
const localMiddleware = require('../middleware/local');
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
router.post(
	'/register',
	localMiddleware.forwardAuthenticated,
	localMiddleware.userRegistration
);

// ============================= HANDLE GOOGLE LOGIN =================
router.get('/register/google', (req, res) => {
	res.send('Logging in With Google');
});

// ============================ LOG_IN PAGE ============================
router.get('/login', (req, res) => {
	res.render('login');
});

// ========================== HANDLING LOGIN ================================
router.post('/login', localMiddleware.login);

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
router.get('/home', localMiddleware.isLoggedIn, (req, res) => {
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
