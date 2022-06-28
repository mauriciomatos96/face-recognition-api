const express = require('express');

const app = express();

app.use(express.json());

const database = {
    users: [
        {
            "id": "123",
            "name": "Mauricio",
            "email": "mauriciomatos44@gmail.com",
            "password": "a159875321",
            "entries": 0,
            "joined": new Date()
        },
        {
            "id": "1234",
            "name": "Laura",
            "email": "lauramatos44@gmail.com",
            "password": "a159875321",
            "entries": 0,
            "joined": new Date()
        },
    ]
}

app.get("/", (req, res) => {
    res.send("this is working");
})

app.post("/signin", (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json("success");
    } else {
        res.status(404).json("error login in");
    }
})

app.listen(3000, () => {
    console.log("The app is running");
})