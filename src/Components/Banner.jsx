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
      img: "https://res.cloudinary.com/dtxtatusv/image/upload/v1763011849/Non-Profit-Fabric-Banner-Template-edit-online_aw34le.png",
      title: "Make a Difference Today",
    },
    {
      img: "https://res.cloudinary.com/dtxtatusv/image/upload/v1763012629/tp39-ae-facebookad-03_e1fdyj.jpg",
      title: "Join Local Community Events",
    },
    {
      img: "https://res.cloudinary.com/dtxtatusv/image/upload/v1763014442/International-Volunteer-Day-2023-1024x512_y7p4st.jpg",
      title: "International volunteers day image",
    },
  ];

  return (
    <section className="w-full relative">
      <Slider {...settings}>
        {banners.map((b, i) => (
          <div key={i} className="relative h-[80vh]">
            <img
              src={b.img}
              alt={b.title}
              className="w-full h-full object-cover"
            />
            {/* <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center text-white"
              >
                <h1 className="text-4xl md:text-6xl font-bold">{b.title}</h1>
                <button className="mt-6 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full">
                  Explore Events
                </button>
              </motion.div>
            </div> */}
          </div>
        ))}
      </Slider>

      <style jsx>{`
        .slick-dots li button:before {
          color: gray; /* all dots color */
        }
        .slick-dots li.slick-active button:before {
          color: green; /* active dot color, Tailwind pink-500 */
        }
      `}</style>
    </section>
  );
};

export default Banner;
