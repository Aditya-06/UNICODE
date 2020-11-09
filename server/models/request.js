const mongoose = require('mongoose');

const date = new Date();
const month = date.getMonth() + 1;

const requestSchema = new mongoose.Schema({
	time: {
		type: String,
		default: `${date.getFullYear()}-${month}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`,
	},
	createdBy: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		name: String,
	},
	pickUpAddress: {
		type: String,
		required: true,
	},
	dropOffAddress: {
		type: String,
		required: true,
	},
	accepted: {
		type: Boolean,
		default: false,
	},
	reqStatus: {
		type: String,
		default: 'pending',
	},
	acceptedby: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		name: String,
	},
});

module.exports = mongoose.model('Request', requestSchema);
