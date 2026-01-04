import React from "react";

const Categories = () => {
  const categories = [
    "Cleanup",
    "Plantation",
    "Donation",
    "Awareness",
    "Other",
  ];

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-6">Event Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="py-2 bg-white text-purple-700 rounded-full mx-auto md:mx-0 w-[94%] md:w-full font-medium shadow-sm"
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
