const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
const cors = require('cors');

const indexRoutes = require('./routes/index');
const requestRoute = require('./routes/requestRouter');
const userRoute = require('./routes/userRouter');
const uploadRoute = require('./routes/uploadRouter');
const driverrRoute = require('./routes/driverRouter');
const dbCon = require('./config/db');

// setting up express
const app = express();
dbCon.db();
app.use(express.json());
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// setting up body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true,
	})
);
*/

// app.use(cookieParser('secret'));
// config files
require('./config/passport-google')(passport);
// require('./config/passport-local')(passport);

/* // running sessions
app.use(passport.initialize());
app.use(passport.session());
*/

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

// using the routes set up
app.use(indexRoutes);
app.use(requestRoute);
app.use(userRoute);
app.use(uploadRoute);
app.use(driverrRoute);

// specifying which port to run on
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`The uber_clone server is up and running on port ${port}`);
});

module.exports = app;
