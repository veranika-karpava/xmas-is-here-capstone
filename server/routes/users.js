const express = require('express');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET;


// function for reading data in users.json
const readFile = () => {
    const usersData = fs.readFileSync('./data/users.json');
    return JSON.parse(usersData);
}

// function for writing data in users.json
const writeFile = (usersData) => {
    fs.writeFileSync('./data/users.json', JSON.stringify(usersData, null, 2));
}

// function for hashing password
async function passwordHash(password) {
    const hashPassword = await bcrypt.hash(password, 8);
    const result = await bcrypt.compare(password, hashPassword)
    console.log(result)
}

// function for authoriztiion
function authorize(req, res, next) {
    if (!req.headers.authorization)
        return res.status(401).send('Not authorized')

    // get the token 
    const authToken = req.headers.authorization.split(" ")[1]; // access the array at the index of 1 to get the token
    // decode the contents of the token
    jwt.verify(authToken, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "not authorized" })
        }

        if (Date.now() > new Date(decoded.exp * 1000)) {
            return res.status(401).json({ message: "token expired" });
        }

        // decoded contents should be placed on req.decoded
        req.decoded = decoded;
        userId = decoded.id;

        next();
    })
}

// post request for sign up
userRouter.post("/", (req, res) => {
    const { username, name, password } = req.body;
    const usersData = readFile();
    if (!username || !name || !password) {
        return res.status(400).send('Please make sure to include all inputs');
    }

    const user = usersData.find((user) => user.username === username);

    if (user) {
        return res.status(400).send('User with this username already exist. Please use a diffrent one');
    }

    const hashPassword = bcrypt.hashSync(password.toString(), 8);

    const userInfo = {
        username: username,
        id: uuid(),
        name: name,
        password: hashPassword,
        wishlist: []
    };

    usersData.push(userInfo);
    writeFile(usersData);

    return res.status(201).json(userInfo);
});

// post request for sign in
userRouter.post('/signin', (req, res) => {
    const { username, password } = req.body;
    const usersData = readFile();
    if (!username || !password) {
        return res.status(400).send('Please make sure to include all inputs');
    }

    const user = usersData.find((user) => user.username === username)
    if (!user)
        return res.status(403).send('User is not found');

    const validPassword = bcrypt.compareSync(password.toString(), user.password)
    if (validPassword) {
        const payload = { id: user.id }
        const token = jwt.sign({ user: user.name, id: user.id }, JWT_SECRET, {
            expiresIn: "24h",
        });
        return res.status(200).json({ user, token });
    } else {
        return res.status(403).send("Username/password combination is wrong");
    }
})

// A profile end-point that will return user information,
userRouter.get('/dashboard', authorize, (req, res) => {
    res.json(req.decoded);
});

// add movie to wishlist of user
userRouter.post('/wishlist', (req, res) => {
    const usersData = readFile();
    const { userId, movieId, title, released, runtime, poster, plot } = req.body;
    const userIndex = usersData.findIndex((user) => user.id === userId)
    if (userIndex < 0) {
        return res.status(404).send({ message: "User not found" });
    } else {
        const wishmovie = {
            movieId: movieId,
            title: title,
            released: released,
            runtime: runtime,
            poster: poster,
            plot: plot,
        };
        usersData[userIndex].wishlist.push(wishmovie);
        writeFile(usersData);
        return res.status(201).json(wishmovie);
    }
})

// get data of wishlist movie 
userRouter.get('/wishlist/:userId', (req, res) => {
    const { userId } = req.params;
    let usersData = readFile();
    const userIndex = usersData.findIndex((user) => user.id === userId)
    if (userIndex < 0) {
        return res.status(404).send({ message: "User not found" });
    } else {

        res.status(200).send(usersData[userIndex].wishlist)
    }

})

// remove movie from wishlist
userRouter.delete('/wishlist/:userId/:movieId', (req, res) => {
    const { userId } = req.params;
    const { movieId } = req.params;
    let usersData = readFile();
    const userIndex = usersData.findIndex((user) => user.id === userId);

    const selectedMovie = usersData[userIndex].wishlist.find((movie) => movie.movieId === movieId);

    const selectedMovieIndex = usersData[userIndex].wishlist.indexOf((selectedMovie));

    if (userIndex < 0) {
        return res.status(404).send({ message: "User not found" });
    } else {
        usersData[userIndex].wishlist.splice(selectedMovieIndex, 1)
        writeFile(usersData);
        return res.status(201).json(usersData);
    }
})

module.exports = userRouter;


