import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";

const ManageEvent = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `https://social-development-event-server-mu.vercel.app/my-events?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.result || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  if (!events || events.length === 0)
    return (
      <p className="text-center mt-10 text-gray-600">
        You haven't created any events yet.
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        Manage Your Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-base-100 shadow-2xl rounded-xl p-4 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <img
              src={event.thumbnailUrl}
              alt={event.title}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
            <p className="text-sm mt-2">
              <strong>Location:</strong> {event.location}
            </p>
            <p className="text-sm font-medium mt-2">
              <strong>Event Date:</strong>{" "}
              {new Date(event.eventDate).toLocaleDateString("en-CA")}
            </p>

            <button
              onClick={() => navigate(`/update-event/${event._id}`)}
              className="mt-4 w-full bg-gradient-to-r from-[#632EE3] to-[#9F62F2]  text-white py-2 rounded-lg hover:from-gray-600 hover:to-gray-500 cursor-pointer"
            >
              Update Event
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageEvent;
