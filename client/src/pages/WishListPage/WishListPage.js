import React from 'react';
import Heading from '../../components/Heading/Heading';
import WishList from '../../components/WishList/WishList';


const WishListPage = () => {
    return (
        <section className='wishlist'>
            <Heading title='Your WishList' />
            <WishList />
        </section>
    );
};

export default WishListPage;