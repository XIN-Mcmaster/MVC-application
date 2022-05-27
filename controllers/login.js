const express = require('express');
var router = express.Router();
const sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

// Displays the login page
router.get("/", async function(req, res)
{
  // if we had an error during form submit, display it, clear it from session
  req.TPL.login_error = req.session.login_error;
  req.session.login_error = "";

  // render the login page
  res.render("login", req.TPL);
});

// Attempts to login a user
// - The action for the form submit on the login page.
router.post("/attemptlogin", async function(req, res)
{
    db.all("SELECT * FROM Users WHERE username=? AND password=?",[req.body.username,req.body.password],
        function (err, results) {

            if (results.length != 0) {
                if (results[0].level == "member") {
                    req.session.username = req.body.username;
                    req.session.level = results[0].level;

                    // re-direct the user to the members page
                    res.redirect("/members");
                } else if (results[0].level == "editor") {
                    req.session.username = req.body.username;
                    req.session.level = results[0].level;

                    // re-direct the user to the members page
                    res.redirect("/editors");
                } else {
                    req.session.login_error = "Invalid username and/or password!";
                    res.redirect("/login");
                }
            } else {
                req.session.login_error = "Invalid username and/or password!";
                res.redirect("/login");
            }            

        });

});


// Logout a user
// - Destroys the session key username that is used to determine if a user
// is logged in, re-directs them to the home page.
router.get("/logout", async function(req, res)
{
    delete (req.session.username);
    delete (req.session.level);
  res.redirect("/home");
});

module.exports = router;
