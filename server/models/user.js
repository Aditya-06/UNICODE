const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: String,
	Role: {
		type: String,
		required: true,
	},
	contact: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('User', userSchema);
