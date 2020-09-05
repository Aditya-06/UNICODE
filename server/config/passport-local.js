const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/user');

module.exports = function (passport) {
	passport.use(
		new LocalStrategy((username, password, done) => {
			// eslint-disable-next-line consistent-return
			User.findOne({ username: username }, (err, user) => {
				if (err) return done(err);

				if (!user) {
					return done(null, false, { message: 'Incorrect Username' });
				}
				bcrypt.compare(password, user.password, (error, isMatch) => {
					if (error) return done(error);
					if (isMatch) {
						return done(null, user);
					}
					return done(null, false, { message: 'Incorrect Password' });
				});
			});
		})
	);
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
};

/* 
const LocalStrategy = require('passport-local').Strategy;
const bycrpyt = require('bcryptjs');

const User = require('../models/user');

module.exports = function (passport) {
	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});

	passport.use(
		new LocalStrategy(
			{ usernameField: 'username' },
			(username, password, done) => {
				// Match User with username etc
				User.findOne({ username: username }, async (err, user) => {
					if (err) {
						return done(err);
					}
					if (!user) {
						return done(null, false, {
							message: 'This username has not been registered',
						});
					}
					if (!user.password) {
						return done(null, false);
					}
					// comapre passwords
					await bycrpyt.compare(password, user.password, (error, isMatch) => {
						if (error) throw error;
						if (isMatch) {
							return done(null, user);
						}
						return done(null, false, { message: 'Password Incorrect' });
					});
					return true;
				});
			}
		)
	);
};
*/
