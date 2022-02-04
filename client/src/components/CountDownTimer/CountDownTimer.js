import './CountDownTimer.scss';
import { useState, useEffect } from 'react';
import React from 'react';
import santafamily from '../../assets/images/santafamily.png';

const CountDownTimer = () => {
    // define state with React hooks
    const [days, setDays] = useState(null);
    const [hours, setHours] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [seconds, setSeconds] = useState(null);

    // function for coundown timer till Christmas
    const countDownTimeXmas = () => {
        const endDate = new Date('December 25,  2022, 00:00:00').getTime();
        const toDay = new Date().getTime();

        const timeDiff = endDate - toDay;

        const seconds = 1000;
        const minutes = seconds * 60;
        const hours = minutes * 60;
        const days = hours * 24;

        // reminder till xmas in days, hours, minutes, seconds
        let timeDays = Math.floor(timeDiff / days);
        let timeHours = Math.floor((timeDiff % days) / hours);
        let timeMinutes = Math.floor((timeDiff % hours) / minutes);
        let timeSeconds = Math.floor((timeDiff % minutes) / seconds);

        // add zero to time when it's less then 10sec/mins/h/d;
        timeSeconds = timeSeconds < 10 ? "0" + timeSeconds : timeSeconds;
        timeMinutes = timeMinutes < 10 ? "0" + timeMinutes : timeMinutes;
        timeHours = timeHours < 10 ? "0" + timeHours : timeHours;
        timeDays = timeDays < 10 ? "0" + timeDays : timeDays;

        // update state 
        setDays(timeDays);
        setHours(timeHours);
        setMinutes(timeMinutes);
        setSeconds(timeSeconds);
    }

    useEffect(() => {
        const timer = setInterval(countDownTimeXmas, 1000);
        return () => {
            clearInterval(timer);
        }
    }, [])

    return (
        <div className='countdown-timer'>
            <div className='countdown-timer__image-container'>
                <img className='countdown-timer__image' src={santafamily} alt='Santa Family' />
            </div>
            <div className='countdown-timer__container-card' >
                <article className='countdown-timer__card'>
                    <p className='countdown-timer__value'>{days}</p>
                    <h3 className='countdown-timer__title'>Days</h3>
                </article>
                <article className='countdown-timer__card'>
                    <p className='countdown-timer__value'>{hours}</p>
                    <h3 className='countdown-timer__title'>Hours</h3>
                </article>
                <article className='countdown-timer__card'>
                    <p className='countdown-timer__value'>{minutes}</p>
                    <h3 className='countdown-timer__title'>Minutes</h3>
                </article>
                <article className='countdown-timer__card'>
                    <p className='countdown-timer__value'>{seconds}</p>
                    <h3 className='countdown-timer__title'>Seconds</h3>
                </article>
            </div>
            <div className="countdown-timer__container-text">
                <h2 className='countdown-timer__text'>till Christmas</h2>
            </div>
        </div>
    );
};

export default CountDownTimer;


