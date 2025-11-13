import React from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section className="py-16 max-w-7xl mx-[20px] md:mx-[140px] rounded-lg bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white text-center">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-2xl md:text-3xl font-bold mb-4"
      >
        Subscribe to Our Newsletter
      </motion.h2>
      <p className="mb-8 text-[14.3px] mx-2 font-medium md:text-lg">
        Stay updated with the latest social development events and activities
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-3 rounded-full placeholder-gray-200 mx-auto md:mx-0 w-[80%] md:w-full border-2 border-white outline-white"
        />
        <button className="bg-white w-[80%] md:w-[35%] mx-auto md:mx-0 text-purple-700 px-6 py-3 rounded-full font-semibold cursor-pointer hover:bg-gray-100">
          Subscribe
        </button>
      </div>
    </section>
  );
};

export default Newsletter;
