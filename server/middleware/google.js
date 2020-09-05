const passport = require('passport');

const googleMiddleware = {};

googleMiddleware.login = passport.authenticate('google', {
	scope: ['profile', 'email'],
});

googleMiddleware.callBack = passport.authenticate('google', {
	successRedirect: '/home',
	failureRedirect: '/',
});

module.exports = googleMiddleware;
