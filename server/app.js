const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const connection = require("./db/config");
const cookieParser = require("cookie-parser");
const PORT = 3000;
app.use(express.json());
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true,
    methods: ["GET", "POST"]
}))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.get("/dashboard", (req, res) => {
    console.log(res);
    res.send("Welcome");
})
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    let sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    connection.query(sql, [email, password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            let token = jwt.sign({ user: result[0] }, "test-secret");
            res.cookie(
                'token',
                token,                                
                {
                    maxAge: 2 * 24 * 60 * 60 * 1000
                }
                
            );
            let d = {
                status: true,
                message: "Login successful",
                data: result[0]
            }
            return res.json(d)

        } else {
            let d = {
                status: false,
                message: "Email or password is incorrect"
            }
            return res.json(d)
        }
    })

})


app.listen(PORT, (err) => {
    console.log(`server listening on http://localhost:${PORT}`);
})