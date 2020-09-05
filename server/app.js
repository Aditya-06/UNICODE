const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const indexRoutes = require('./routes/index');
// const db = require('./config/keys').MongoURI;

// setting up express
const app = express();
app.use(express.urlencoded({ extended: false }));

// connecting to MongoDB
mongoose
	.connect('mongodb://localhost:27017/yelp_camp', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to DB!'))
	.catch((error) => console.log(error));

// setting up body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// setting default template engine as ejs (temporary)
app.set('view engine', 'ejs');

app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true,
	})
);

app.use(cookieParser('secret'));
// config files
require('./config/passport-google')(passport);
require('./config/passport-local')(passport);

// running sessions
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

// using the routes set up
app.use(indexRoutes);

// specifying which port to run on
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`The uber_clone server is up and running on port ${port}`);
});
