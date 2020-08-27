const express = require("express"),
      router  = express.Router();

// ======== ROOT ROUTE ===========
router.get("/", (req, res) => {
    res.render("landing");
});

// ========= REGISTER ROUTE ========
router.get("/register", (req, res) => {
    res.render("register")
});

// ========== LOG_IN PAGE ============
router.get("/login", (req, res) => {
    res.render("login");
});

module.exports = router;