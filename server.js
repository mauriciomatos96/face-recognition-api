const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');

app.use(express.json());
app.use(cors())

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
            "password": "amor",
            "entries": 0,
            "joined": new Date()
        },
    ],
    "login": [
        {
            "id": "987",
            "hash": '',
            "email": "mauriciomatos44@gmail.com"
        }
    ]
}


app.get("/", (req, res) => {
    res.send(database.users);
})

app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            res.json(user);
        }
    })
    if (!found) {
        res.status(404).json("not found");
    }
})

app.post("/signin", (req, res) => {
    bcrypt.compare("algo", "$2a$10$yhCyEKylibnK/dzJVWzGreeWnze7vL4gKn3181nLiPDqAJtAtnzzG", function (err, res) {
        console.log(res)
    });
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json("success");
    } else {
        res.status(404).json("error login in");
    }
})

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, null, null, function (err, hash) {
        console.log(hash)
    });
    database.users.push(
        {
            "id": "12345",
            "name": name,
            "email": email,
            "password": password,
            "entries": 0,
            "joined": new Date()
        }
    );
    res.json(database.users[database.users.length - 1])
})

app.post("/image", (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(404).json("not found");
    }
})


app.listen(3000, () => {
    console.log("The app is running");
})