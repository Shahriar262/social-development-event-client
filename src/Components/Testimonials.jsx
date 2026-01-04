import React from "react";

const Testimonials = () => {
  const reviews = [
    { name: "Alice", text: "Loved participating in the beach cleanup!" },
    { name: "Rahim", text: "Plantation event was amazing and organized well." },
    { name: "Sara", text: "Great platform to contribute to social causes." },
  ];

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-6">Testimonials</h2>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center gap-6">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="bg-indigo-50 p-6 rounded-xl shadow-md w-full md:w-64"
          >
            <p className="text-gray-700 italic">"{r.text}"</p>
            <p className="text-black mt-4 font-semibold">{r.name}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Testimonials;
