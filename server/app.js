const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const indexRoutes = require('./routes/index');

// setting up express
const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));

// connecting to MongoDB
mongoose
	.connect(process.env.MongoDB_Connection_String, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log('Connected to Database!'))
	.catch((err) => console.log(err));

// setting up body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
