import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import WishMovieCard from '../WishMovieCard/WishMovieCard';
import './WishList.scss'

// env variable = REACT_APP_API_URL
const API_URL = process.env.REACT_APP_API_URL;

const WishList = () => {
    const [wishList, setWishList] = useState([]);
    const userId = sessionStorage.getItem('userId');

    // get data of movies in wishlist
    useEffect(() => {
        axios
            .get(`${API_URL}/wishlist/${userId}`)
            .then((res) => {
                setWishList(res.data)
            })
            .catch((err) => console.log(`Get request for wishMovieCard: ${err}`))
    }, [])

    // delete movie from wishlist and update wishlist after delete
    const removeItem = (id) => {
        axios
            .delete(`${API_URL}/wishlist/${userId}/${id}`)
            .then((res) => {
                return axios
                    .get(`${API_URL}/wishlist/${userId}`)
            })
            .then((res) => {
                setWishList(res.data);
                window.scroll(0, 0);
            })
            .catch((err) => console.log(`Delete request for delete movie from wishlist: ${err}`));
    }

    return (
        <>
            {(wishList.length === 0) ? <p className="wishlist__error-message"> Your wishlist is Empty</p> :
                <ul className='wishlist__list'>
                    {wishList.map((movie, i) => {
                        return (
                            <WishMovieCard
                                key={i}
                                id={movie.movieId}
                                title={movie.title}
                                poster={movie.poster}
                                runtime={movie.runtime}
                                plot={movie.plot}
                                removeItem={removeItem}
                            />
                        )
                    })}
                </ul>
            }
        </>
    );
};

export default WishList;