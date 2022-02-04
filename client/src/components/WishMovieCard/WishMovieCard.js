import React from 'react';
import Button from '../Button/Button';
import './WishMovieCard.scss';

const WishMovieCard = ({ id, title, runtime, plot, poster, removeItem }) => {

    return (
        <li className='wishlist__item' key={id}>
            <h1 className="wishlist__title">{title}</h1>
            <img src={poster} alt={title} className="wishlist__poster" />
            <div className='wishlist__container'>
                <p className="wishlist__info">{`Runtime: ${runtime}`}</p>
                <p className="wishlist__info">{`Plot: ${plot}`}</p>
            </div>
            <Button title="Remove" value="button" type="button" onClick={() => removeItem(id)} />
        </li>
    );
};

export default WishMovieCard;

