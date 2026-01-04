import React from "react";
import { motion } from "framer-motion";

const Gallery = () => {
  const images = [
    "gallery1.jpg",
    "gallery2.jpg",
    "gallery3.jpg",
    "gallery4.jpg",
    "gallery5.webp",
    "gallery6.webp",
    "gallery7.jpg",
    "gallery8.jpg",
  ];

  return (
    <section className="py-14">
      <h2 className="text-3xl font-bold text-center mb-10">Event Gallery</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6 md:px-0">
        {images.map((img, index) => (
          <motion.img
            key={index}
            src={`/images/${img}`}
            alt={`Gallery ${index + 1}`}
            className="rounded-xl object-cover h-56 w-full shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ scale: 1.05 }}
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
