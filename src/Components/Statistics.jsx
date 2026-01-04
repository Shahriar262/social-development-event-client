import React from "react";

const Statistics = () => {
  const stats = [
    { label: "Events Organized", value: 120 },
    { label: "Participants", value: 5000 },
    { label: "Volunteers", value: 800 },
    { label: "Cities Covered", value: 25 },
  ];

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-6">Our Impact</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-6 w-36">
            <p className="text-4xl font-bold text-indigo-600">{s.value}</p>
            <p className="mt-2 text-gray-600">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
