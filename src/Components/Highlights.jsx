import React, { useEffect, useState } from "react";
import { Link } from "react-router";


const Highlights = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://social-development-event-server-mu.vercel.app/events")
      .then((res) => res.json())
      .then((data) => {
        // Only upcoming events
        const upcomingEvents = data.filter(
          (event) => new Date(event.eventDate) >= new Date()
        );
        setEvents(upcomingEvents.slice(0, 4)); 
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Top Events
      </h2>
      <p className="text-center mb-10">
        Check out the most impactful upcoming events in your area!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <Link
              to={`/event-details/${event._id}`}
              key={event._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={event.thumbnailUrl}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-black text-xl font-semibold">{event.title}</h3>
                <p className="text-black mt-1">{event.location}</p>
                <p className="text-black text-sm mt-1">
                  {new Date(event.eventDate).toLocaleDateString("en-CA")}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No upcoming events available.
          </p>
        )}
      </div>
      <div className="flex justify-center items-center">
      <Link to='/upcoming-event' className="btn text-white  mt-6 bg-gradient-to-r from-[#632EE3] to-[#9F62F2]">Show All</Link>
      </div>
    </div>
  );
};

export default Highlights;
