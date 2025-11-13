import React from 'react';
import Banner from '../Components/Banner';
import Features from '../Components/Features';
import Gallery from '../Components/Gallery';
import Newsletter from '../Components/Newsletter';


const Home = () => {
    return (
        <div>
           <Banner />
           <Features />
           <Gallery />
           <Newsletter />
        </div>
    );
};

export default Home;