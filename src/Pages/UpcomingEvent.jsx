import React, { useEffect, useState } from "react";
import EventCard from "../Components/EventCard";

const UpcomingEvent = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    fetch("https://social-development-event-server-mu.vercel.app/events")
      .then((res) => res.json())
      .then((data) => {
        const upcomingEvent = data.filter(
          (event) => new Date(event.eventDate) >= new Date()
        );
        setEvents(upcomingEvent);
        setFilteredEvents(upcomingEvent);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const text = search.toLowerCase();
    const searchedText = events.filter((event) =>
      event.title.toLowerCase().includes(text)
    );

    setFilteredEvents(searchedText);
  };

  const handleFilterByType = (type) => {
    setFilterType(type);
    if (!type) {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) => event.eventType === type);
      setFilteredEvents(filtered);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 font-semibold text-xl">
        Loading Events....
      </p>
    );

  return (
    <div>
      <div className="text-2xl text-center font-bold mt-10">
        All Upcoming Events
      </div>
      <p className=" text-center mt-2">Explore Upcoming Events.</p>

      <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center max-w-7xl mx-auto mb-[-40px] mt-8">
        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="text-center my-6 flex justify-center gap-2"
        >
          <input
            type="search"
            placeholder="Search by title"
            className="input rounded-full focus:outline-none px-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn bg-purple-700 text-white hover:bg-purple-600 rounded-full">
            Search
          </button>
        </form>

        {/* Filter Dropdown */}
        <div className="flex justify-center items-center gap-4 mb-4 md:mb-0">
          <select
            className="select rounded-full"
            value={filterType}
            onChange={(e) => handleFilterByType(e.target.value)}
          >
            <option value="">Filter by Event Type</option>
            <option value="Cleanup">Cleanup</option>
            <option value="Plantation">Plantation</option>
            <option value="Donation">Donation</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-3 max-w-7xl mx-auto px-4 md:px-0 lg:px-0 mt-10">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))
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
