const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
	name: String,
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
});

module.exports = mongoose.model('Driver', driverSchema);
