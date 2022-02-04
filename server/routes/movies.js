const express = require('express');
const fs = require('fs');
const movieRouter = express.Router();

// function for reading data in datecards.json
const readDataCards = () => {
    const dateCards = fs.readFileSync('./data/datecards.json');
    return JSON.parse(dateCards);
}

// get request front title for movie card
movieRouter.get('/', (_req, res) => {
    let dateCards = readDataCards();
    dateCards = dateCards.map(card => {
        return {
            day: card.day,
            month: card.month,
            title: card.title,
            image: card.image,
        }
    })
    res.status(200).send(dateCards)
})

// function for reading data in movies.json
const readMoviesData = () => {
    const moviesData = fs.readFileSync('./data/xmasmovies.json');
    return JSON.parse(moviesData);
}

// get request for get movie title randomly
movieRouter.get('/movie', (_req, res) => {
    const moviesData = readMoviesData();
    const randomMovie = moviesData[Math.floor(Math.random() * moviesData.length)]
    res.status(200).send(randomMovie)
})

module.exports = movieRouter;