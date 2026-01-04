import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import Features from "../Components/Features";
import Gallery from "../Components/Gallery";
import Newsletter from "../Components/Newsletter";
import Categories from "../Components/Categories";
import Highlights from "../Components/Highlights";
import FAQ from "../Components/FAQ";
import Testimonials from "../Components/Testimonials";
import Statistics from "../Components/Statistics";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div>
      <Banner />
      <Features />
      <Gallery />
      <Newsletter />
      <div className="mt-20">
        <Categories />
      </div>
      <div className="mt-20">
        <Highlights />
      </div>
      <div className="mt-20">
        <Statistics />
      </div>
      <div className="mt-20">
        <Testimonials />
      </div>
      <div className="mt-20">
        <FAQ />
      </div>
    </div>
  );
};

export default Home;
