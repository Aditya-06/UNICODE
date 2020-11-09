const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	username: {
		type: String,
		unique: true,
	},
	password: String,
	role: {
		type: String,
	},
	contact: {
		type: Number,
	},
	request: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Request',
		},
	],
	pfp: {
		type: String,
	},
});

module.exports = mongoose.model('User', userSchema);
