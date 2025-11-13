import React from "react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      icon: "📅",
      title: "Create & Manage Events",
      desc: "Easily organize and edit your social events.",
    },
    {
      icon: "🤝",
      title: "Join Local Activities",
      desc: "Participate in cleanup, donation, and plantation drives.",
    },
    {
      icon: "📊",
      title: "Track Your Contributions",
      desc: "View all the events you’ve created or joined.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 text-center">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-10"
      >
        Why Join Us?
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-base-100 shadow-2xl rounded-2xl"
          >
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
