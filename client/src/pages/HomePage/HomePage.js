
import CountDownTimer from '../../components/CountDownTimer/CountDownTimer';
import FormSignUp from '../../components/FormSignUp/FormSignUp';
import FormSignIn from '../../components/FormSignIn/FormSignIn';
import React from 'react';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
    const { pathname } = useLocation();
    return (
        <section className='home-page'>
            <CountDownTimer />
            {pathname === '/' ? <FormSignUp /> : <FormSignIn />}
        </section>
    );
};

export default HomePage;