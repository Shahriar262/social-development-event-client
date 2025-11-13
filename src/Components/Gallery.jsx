import React from "react";
import { motion } from "framer-motion";

const Gallery = () => {
  const images = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10">Event Gallery</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6">
        {images.map((n) => (
          <motion.img
            key={n}
            src={`/images/gallery${n}.jpg`}
            alt={`Gallery ${n}`}
            className="rounded-xl object-cover h-56 w-full shadow-sm"
            whileHover={{ scale: 1.05 }}
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
