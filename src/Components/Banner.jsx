import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const banners = [
    {
      img: "https://i.ibb.co.com/60t15z76/volunteering-illustration.webp",
      title: "Make a Difference Today",
    },
    {
      img: "https://i.ibb.co.com/kgdWRXTR/istockphoto-1625310710-612x612.jpg",
      title: "Join Local Community Events",
    },
    {
      img: "https://i.ibb.co.com/kgxXq7MR/how-do-i-find-local-volunteer-opportunities-1920w.webp",
      title: "Be the Change You Want to See",
    },
  ];

  return (
    <section className="w-full relative">
      <Slider {...settings}>
        {banners.map((b, i) => (
          <div key={i} className="relative h-[50vh] md:h-[80vh]">
            <img
              src={b.img}
              alt={b.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center text-white"
              >
                <h1 className="text-2xl md:text-6xl font-bold">{b.title}</h1>
                <button className="mt-6 px-6 py-3 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:from-gray-600 hover:to-gray-500 cursor-pointer font-semibold text-white rounded-full">
                  Explore Events
                </button>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>

      <style jsx>{`
        .slick-dots li button:before {
          color: rgb(156 163 175); 
          opacity: 1;
          transition: color 0.3s ease;
        }
        .slick-dots li.slick-active button:before {
          color: blue; 
        }
      `}</style>
    </section>
  );
};

export default Banner;
