const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const PORT = process.env.PORT || 5050;

// CORS middleware
app.use(cors({
    origin: process.env.CLIENT_URL
}));

// middleware for parsing video.json
app.use(express.json());

// static middleware
app.use(express.static('public'));

// router middleware
app.use('/', userRouter);
app.use('/movies-calendar', movieRouter);

app.listen(PORT, () => {
    console.log(`🚀 Server listening on ${PORT}`)
})