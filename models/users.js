const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

async function init() {
    try {
        db = await sqlite.open({
            filename: 'database.db',
            driver: sqlite3.Database
        });
    } catch (err) {
        console.error(err);
    }
}

init();

// Return all of the articles
async function getAllUsers() {
    let results = await db.all("SELECT * FROM Users");
    return results;
}

async function createUser(user) {
    await db.run("INSERT INTO Users VALUES (?,?,?)",
        [user.username, user.password, "member"]);
}

// Create a new article given a title, content and username
async function deleteUser(username) {
    await db.run("DELETE FROM Users WHERE username = ?",
        [username]);
    await db.run("DELETE FROM Articles WHERE username = ?",
        [username]);
}

module.exports = {
    getAllUsers
    , createUser, deleteUser
};
