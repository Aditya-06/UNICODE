const express = require("express"),
      router  = express.Router();

// ======== ROOT ROUTE ===========
router.get("/", (req, res) => {
    res.render("landing");
});

// ========= REGISTER ROUTE ========
router.get("/register", (req, res) => {
    res.send("Welcome to Registration Page");
});

// ========== LOG_IN PAGE ============
router.get("/login", (req, res) => {
    res.send("Welcome to Login Page");
});

module.exports = router;