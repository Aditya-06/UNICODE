const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	username: {
		type: String,
		required: true,
	},

	password: String,

	googleId: String,
});

module.exports = mongoose.model('User', userSchema);
