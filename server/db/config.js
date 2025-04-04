const mysql = require("mysql");

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "blog"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the MySQL database!");
})

module.exports = connection;