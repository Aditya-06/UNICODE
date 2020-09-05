const GoogleStrategy = require('passport-google-oauth20');

const User = require('../models/user');
const keys = require('./keys');

module.exports = (passport) => {
	passport.use(
		new GoogleStrategy(
			{
				// options to use google strategy
				callbackURL: '/google/redirect',
				clientID: keys.google.clientID,
				clientSecret: keys.google.clientSecret,
			},
			(accessToken, refreshToken, profile, done) => {
				console.log('passport callback function fired');
				console.log(profile);

				User.findOne({ googleId: profile.id }, async (err, user) => {
					if (err) {
						done(err, false);
					}
					if (user) {
						console.log('User Already Exists');
					}
					if (!user) {
						const newUser = new User({
							name: profile.displayName,
							email: profile.emails[0].value,
							googleId: profile.id,
						});
						await newUser.save();
						console.log('New User Has Been Created!');
						done(null, newUser);
					}

					return done(null, user);
				});
			}
		)
	);
	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, done) => {
		User.findOne({ _id: id }, (err, user) => {
			done(err, user);
		});
	});
};

// server id: i750EaY3AnB60s1POhgfaPjq
