const mongoose = require('mongoose');
require('dotenv').config();

module.exports = {
	db: async () => {
		try {
			await mongoose.connect(process.env.MONGODB_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
			});
			console.log('db connected');
		} catch (err) {
			console.log(err);
		}
	},
	close: () => mongoose.connection.close(),
};
