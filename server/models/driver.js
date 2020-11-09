const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
	rating: {
		value: Number,
	},
	dependants: {
		type: Number,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	Sex: String,
	request: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Request',
		},
	},
});

module.exports = mongoose.model('Driver', driverSchema);
