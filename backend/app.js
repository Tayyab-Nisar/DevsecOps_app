const express = require("express");
const app = express();

// BAD PRACTICE: hardcoded secret
const API_KEY = "123456-secret-key";

app.get("/user", (req, res) => {
    const username = req.query.name;
    res.send(`Hello ${username}`);
});

app.listen(3000, () => console.log("Server running"));
