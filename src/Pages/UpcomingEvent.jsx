import React, { useEffect, useState } from "react";
import EventCard from "../Components/EventCard";

const UpcomingEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then((res) => res.json())
      .then((data) => {
        const upcomingEvent = data.filter(
          (event) => new Date(event.eventDate) >= new Date()
        );
        setEvents(upcomingEvent);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 font-semibold text-xl">
        Loading Events....
      </p>
    );

  return (
    <div>
      <div className="text-2xl text-center font-bold">All Upcoming Events</div>
      <p className=" text-center">Explore Upcoming Events.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-7xl mx-auto px-4 md:px-0 lg:px-0 mt-10">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event._id} event={event} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No upcoming events available.
          </p>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvent;
