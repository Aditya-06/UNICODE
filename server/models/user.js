const mongoose = require("mongoose");

let userSchema = new mongoose.Schema ({
    name: String,
    email: String,
    mobile: Number,
    roles: String,
    address: String
})

module.exports = mongoose.model("User", userSchema);