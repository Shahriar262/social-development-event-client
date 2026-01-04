import React from "react";

const FAQ = () => {
  const faqs = [
    { q: "How can I join an event?", a: "Sign up and click 'Join Event' on the event page." },
    { q: "Do I need to pay?", a: "No, all events are free to join." },
    { q: "Can I host my own event?", a: "Yes, register and submit your event proposal." },
  ];

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        {faqs.map((f, i) => (
          <div key={i} className="text-left bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-black font-semibold">{f.q}</p>
            <p className="text-gray-600 mt-1">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
