const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
	name: String,
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: String,

	rating: {
		value: Number,
	},
	contact: {
		type: Number,
		required: true,
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
