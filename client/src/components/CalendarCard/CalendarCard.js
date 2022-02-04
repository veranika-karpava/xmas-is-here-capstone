import { useState, useEffect } from 'react';
import { formatURLImage, getDayToday } from '../../utils/utils';
import { Link } from 'react-router-dom';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import './CalendarCard.scss';

// env variable = REACT_APP_API_URL
const API_URL = process.env.REACT_APP_API_URL;

const CalendarCard = () => {
    const [dateCards, setDateCards] = useState([]);

    // get image from server and update state
    useEffect(() => {
        axios
            .get(`${API_URL}/movies-calendar`)
            .then((res) => {
                const cardData = res.data;

                setDateCards(cardData);
            })
            .catch(err => console.log(`Get request for getting image with: ${err}`));
    }, [])

    // function for mapping res.data 24 times
    const renderFrontCard = () => {
        let frontCard = [];
        let frontCardsToMap = [];
        let days = 1;
        let indexCard = 0;

        while (days < 25) {
            if (indexCard > 7) {
                indexCard = 0;
            }

            {
                (days <= getDayToday()) ?
                    frontCard = (
                        <Link to='/movies-calendar/movie' className='calendar-card-list__link' key={uuidv4()}>
                            <li className='calendar-card-list__item--active'>
                                <img src={formatURLImage(dateCards[indexCard].image)} alt={(dateCards[indexCard].title)} className='calendar-card-list__image--active' />
                                <p className='calendar-card-list__title--active' >{`December ${days}`}</p>
                            </li>
                        </Link>
                    )
                    :
                    frontCard = (
                        <li className='calendar-card-list__item' key={uuidv4()}>
                            <img src={formatURLImage(dateCards[indexCard].image)} alt={(dateCards[indexCard].title)} className='calendar-card-list__image' />
                            <p className='calendar-card-list__title'>{`December ${days}`}</p>
                            <div className='calendar-card-list__locked' >
                                <p className='calendar-card-list__text'>Sorry, the card is locked</p>
                                <p className='calendar-card-list__text'>It will be open when the day comes.</p>
                            </div>
                        </li>)
            }
            frontCardsToMap.push(frontCard)
            indexCard++;
            days++;
        }
        return frontCardsToMap;
    }

    return (
        <>
            {(!dateCards.length) ? <p className="calendar-card__message">...Loading...</p> : <ul className='calendar-card-list'>{renderFrontCard()}</ul>}
        </>
    )
}

export default CalendarCard;