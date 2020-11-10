const mongoose = require('mongoose');
require('dotenv').config();

module.exports = {
	db: async () => {
		try {
			await mongoose.connect(process.env.MongoDB_Connection_String, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
				useFindAndModify: false,
			});
			console.log('Connected to Database');
		} catch (err) {
			console.log(err);
		}
	},
	close: () => mongoose.connection.close(),
};
