import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import Features from "../Components/Features";
import Gallery from "../Components/Gallery";
import Newsletter from "../Components/Newsletter";

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
    </div>
  );
};

export default Home;
