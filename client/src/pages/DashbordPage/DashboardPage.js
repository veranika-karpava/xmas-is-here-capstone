import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import Heading from '../../components/Heading/Heading'
import DashBoardListCard from '../../components/DashBoardListCard/DashBoardListCard';
import './DashboardPage.scss';

// env variable = REACT_APP_API_URL
const API_URL = process.env.REACT_APP_API_URL;

const DashboardPage = () => {
    const [name, setName] = useState();

    useEffect(() => {
        const token = sessionStorage.getItem('token');

        axios
            .get(`${API_URL}/dashboard`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setName(res.data.user)
            })
            .catch((err) => console.log(`Get request for DashBoardPage: ${err}`));
    }, [])

    return (
        <section className='dashboard-section'>
            <Heading title={`Hi, ${name}`} showTagline />
            <DashBoardListCard />
        </section>
    );
};

export default DashboardPage;