import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './MovieCard.scss'
import Button from "../Button/Button";

// env variable = REACT_APP_API_URL
const API_URL = process.env.REACT_APP_API_URL;

// env variable = API_KEY
const API_KEY = process.env.REACT_APP_API_KEY_OMBD;


const MovieCard = () => {
    const [titleMovie, setTitleMovie] = useState('');
    const [movieData, setMovieData] = useState([]);
    const [streamingInfo, setStreamingInfo] = useState({});
    const [counter, setCounter] = useState(1);
    const history = useHistory();
    const userId = sessionStorage.getItem('userId');


    // function for getting movie and details of movie
    const fetchMovieData = () => {
        axios
            .get(`${API_URL}/movies-calendar/movie`)
            .then((res) => {
                const titleResult = res.data.title;
                setTitleMovie(titleResult);
                return titleResult;
            })
            .then((titleResult) => {
                // get request to get data of movie from external API
                axios
                    .get(`http://www.omdbapi.com/?t=${titleResult}&apikey=${API_KEY}`)
                    .then((res) => {
                        const movieDetails = res.data;
                        setMovieData(movieDetails);
                    })

            })
            .catch(err => console.log(err));
    }

    // render component
    useEffect(() => {
        fetchMovieData();
    }, [])

    // function for adding movie to wishlist
    const AddMovieToWishlist = () => {
        axios
            .post(`${API_URL}/wishlist`, {
                userId: userId,
                movieId: movieData.imdbID,
                title: movieData.Title,
                released: movieData.Released,
                runtime: movieData.Runtime,
                poster: movieData.Poster,
                plot: movieData.Plot,
            })
            .then((res) => {
                return history.push('/wishlist');
            })
            .catch((err) => {
                console.log(`Post request for adding movie and details of movie with: ${err}`);
            });
    }

    // function for option to change movie 3 times
    const RandomHandler = (e) => {
        if (counter <= 3) {
            e.preventDefault();
            fetchMovieData();
            setCounter(counter + 1);
        }
        return;
    }

    const renderMoviesData = () => {
        return (
            <article className="movie-card">
                {(movieData.Response === 'False') ? <p className="movie-card__error-message">...Oppps, something went wrong...</p> :
                    <>
                        <h1 className="movie-card__title">{movieData.Title}</h1>
                        <div className='movie-card__container-movie-info'>
                            <img src={movieData.Poster} alt="Movie Poster" className="movie-card__image" />
                            <div className="movie-card__container-info">
                                <p className="movie-card__info">{`Genre: ${movieData.Genre}`}</p>
                                <p className="movie-card__info">{`Released: ${movieData.Released}`}</p>
                                <p className="movie-card__info">{`Runtime: ${movieData.Runtime}`}</p>
                                <p className="movie-card__info">{`Actors: ${movieData.Actors}`}</p>
                                <p className="movie-card__info">{`Plot: ${movieData.Plot}`}</p>
                            </div>
                        </div>
                        <div className='movie-card__button-container'>
                            <Button title='Add to WishList' type='submit' value='Submit' onClick={AddMovieToWishlist} />
                            <Button title='More option' type='button' value='button' onClick={RandomHandler} />
                        </div>
                    </>}
            </article>
        )
    }

    return (
        <>
            {renderMoviesData()}
        </>
    );
};

export default MovieCard;