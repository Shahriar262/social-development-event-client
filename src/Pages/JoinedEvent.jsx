import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const JoinedEvent = () => {
  const { user } = useContext(AuthContext);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:5000/join-event/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        
        if (data.success) {
          setJoinedEvents(data.joinedEvents); 
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.email]);

  if (loading)
    return (
      <p className="text-center mt-10 font-semibold text-xl">Loading...</p>
    );

  if (!joinedEvents || joinedEvents.length === 0)
    return (
      <p className="text-center mt-10 text-gray-600">
        You haven’t joined any events yet.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        Your Joined Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {joinedEvents.map((event) => (
          <div
            key={event._id}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <img
              src={event.thumbnailUrl}
              alt={event.eventTitle}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">{event.eventTitle}</h3>
            <p className="text-sm font-bold mt-2">Joined by: <span className="font-medium">{event.userEmail}</span></p>
            <p className="text-sm font-bold mt-2">Location: <span className="font-medium">{event.eventLocation}</span></p>
            <p className="text-sm font-bold mt-2">Joined at: <span className="font-medium">{new Date(event.joinedAt).toLocaleDateString("en-CA")}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinedEvent;
