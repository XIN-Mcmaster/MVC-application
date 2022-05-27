const express = require('express');
var router = express.Router();
const ArticlesModel = require('../models/articles.js');
const UsersModel = require('../models/users.js');
const sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

// Display the editors page
router.get("/", async function(req, res)
{
    let articleresults = await ArticlesModel.getAllArticles();
    let userresults = await UsersModel.getAllUsers();
    req.TPL.articles = articleresults;
    req.TPL.users = userresults;
    res.render("editors", req.TPL);
});

router.get("/deleteuser/:username", async function (req, res) {
    res.redirect("/editors");
    await UsersModel.deleteUser(req.params.username);
    
});

router.get("/deletearticle/:title", async function (req, res) {

    await ArticlesModel.deleteArticle(req.params.title);
    res.redirect("/editors");
});



module.exports = router;
