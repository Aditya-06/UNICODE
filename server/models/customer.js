const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		default: 'Mumbai',
	},
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

module.exports = mongoose.model('Customer', customerSchema);
