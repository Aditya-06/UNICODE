const express     = require("express"),
      app         = express(),
      mongoose    = require("mongoose"),
      User        = require("./models/user"),
      bodyParser  = require("body-parser"),
      indexRoutes = require("./routes/index");

// connecting to mongoose
mongoose.connect("mongodb://localhost:27017/uber_clone", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to DB!"))
.catch(error => console.log(error));  

// setting up body-parser
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.use(indexRoutes);


// specifying which port to run on
let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("The uber_clone server is up and running on port 3000");
})