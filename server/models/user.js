const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: String,

	googleId: String,
	request: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Request',
		},
	],
	rating: {
		value: Number,
	},
});

module.exports = mongoose.model('User', userSchema);
