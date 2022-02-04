import React from 'react';
import { getToday } from '../../utils/utils.js';
import './Heading.scss';


const Heading = ({ title, showDay, showTagline }) => {

    return (
        <div className='heading'>
            <h1 className='heading__title'>{title}</h1>
            {showDay && <p className='heading__tagline'>Today is {getToday()}!</p>}
            {showTagline && <p className='heading__tagline'>Christmas is coming...!</p>}
        </div>
    );
};

export default Heading;