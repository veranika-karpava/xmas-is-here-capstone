import React from 'react';
import santamovie from '../../assets/images/santa5.png';
import santacartoon from '../../assets/images/santa3.png';
import santawishlist from '../../assets/images/santa1.png';
import { Link } from 'react-router-dom';
import './DashBoardListCard.scss';

const DashBoardListCard = () => {
    return (
        <div className='dashboard'>
            <Link className='dashboard__link' to='/movies-calendar'>
                <article className='dashboard__container-movies'>
                    <h2 className='dashboard__title'>Movies Advent Calendar</h2>
                    <img className='dashboard__image' src={santamovie} alt='Santa in the chair' />
                </article>
            </ Link>
            {/* <Link className='dashboard__link' to='/cartoons-calendar'>
                <article className='dashboard__container-cartoons'>
                    <h2 className='dashboard__title'>Cartoons Advent Calendar</h2>
                    <img className='dashboard__image' src={santacartoon} alt='Santa with box' />
                </article>
            </Link> */}
            <Link className='dashboard__link' to='/wishlist'>
                <article className='dashboard__container-wishlist'>
                    <h2 className='dashboard__title'>Wishlist</h2>
                    <img className='dashboard__image' src={santawishlist} alt='Santa with gift' />
                </article>
            </Link>
        </div>
    );
};

export default DashBoardListCard;