const express = require('express');
var router = express.Router();
const UsersModel = require('../models/users.js');
const sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

// Displays the login page
router.get("/", async function (req, res) {
    req.TPL.signup_error = req.session.signup_error;
    req.session.signup_error = "";
    req.TPL.signup_success = req.session.signup_success;
    req.session.signup_success = "";

    // render the login page
    res.render("signup", req.TPL);
});

router.post("/createaccount", async function (req, res) {
    if (req.body.username != "" && req.body.password != "") {
        await UsersModel.createUser(req.body);
        req.session.signup_success = "User account created! <a href='/login'>Login </a>to access you new account.";
        res.redirect("/signup");

    } else {
        req.session.signup_error = "Username/password cannot be blank!";
        res.redirect("/signup");
    }
});

module.exports = router;