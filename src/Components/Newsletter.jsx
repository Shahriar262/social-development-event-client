import React from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-pink-600 to-pink-700 text-white text-center">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold mb-4"
      >
        Subscribe to Our Newsletter
      </motion.h2>
      <p className="mb-8 text-lg">
        Stay updated with the latest social development events and activities
      </p>
      <div className="flex justify-center gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-3 rounded-full w-full text-black outline-none"
        />
        <button className="bg-white text-pink-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100">
          Subscribe
        </button>
      </div>
    </section>
  );
};

export default Newsletter;
