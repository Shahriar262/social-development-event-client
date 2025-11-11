import React from "react";
import { useLoaderData } from "react-router";
import EventCard from "../Components/EventCard";

const UpcomingEvent = () => {
  const data = useLoaderData()
  console.log(data);
  


  return (
    <div>
      <div className="text-2xl text-center font-bold">All Upcoming Events</div>
      <p className=" text-center">Explore Upcoming Events.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-7xl mx-auto px-4 md:px-0 lg:px-0 mt-10">
        {data.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvent;
