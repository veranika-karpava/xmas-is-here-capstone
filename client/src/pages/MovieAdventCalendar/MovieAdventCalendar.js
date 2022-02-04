import React from 'react';
import Heading from '../../components/Heading/Heading';
import CalendarCard from '../../components/CalendarCard/CalendarCard';

const MovieAdventCalendar = () => {
    return (
        <section className='movie-advent-calendar'>
            <Heading title='Ho! Ho! Ho!' showDay />
            <CalendarCard />
        </section>
    );
};

export default MovieAdventCalendar;

