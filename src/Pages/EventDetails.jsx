import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  const ratingsData = [
    { name: "1 Star", count: 2 },
    { name: "2 Star", count: 3 },
    { name: "3 Star", count: 5 },
    { name: "4 Star", count: 10 },
    { name: "5 Star", count: 20 },
  ];

  useEffect(() => {
    fetch(`https://social-development-event-server-mu.vercel.app/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data.result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleJoin = () => {
    if (!user?.email) {
      toast.error("You must be logged in to join this event!");
      navigate("/auth/login");
      return;
    }

    setJoining(true);
    fetch("https://social-development-event-server-mu.vercel.app/join-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId: id,
        userEmail: user.email,
        eventTitle: event.title,
        eventLocation: event.location,
        thumbnailUrl: event.thumbnailUrl,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setJoining(false);
        data.success
          ? toast.success("Successfully joined this event!")
          : toast.error(data.message || "Failed to join event.");
      })
      .catch(() => {
        setJoining(false);
        toast.error("Something went wrong. Try again!");
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  if (!event) {
    return <p className="text-center mt-10">Event not found</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0 py-10 space-y-12">
     
      <section className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={event.thumbnailUrl}
            alt={event.title}
            className="w-full h-64 md:h-80 lg:h-[420px] object-cover rounded-xl"
          />
        </div>

        {/* Title + Description */}
        <div className="w-full lg:w-1/2 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {event.title}
          </h1>

          <p className="text-sm">
            Created by <span className="font-medium">{event.createdBy}</span>
          </p>

          <p className="leading-relaxed">{event.description}</p>

          <button
            onClick={handleJoin}
            disabled={joining}
            className={`mt-4 px-6 py-3 rounded-lg text-white text-base ${
              joining
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:opacity-90"
            }`}
          >
            {joining ? "Joining..." : "Join Event"}
          </button>
        </div>
      </section>

      {/* Event Details */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
        <div className="space-y-3">
          <p>
            <strong>Event Type:</strong> {event.eventType}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(event.eventDate).toLocaleDateString("en-CA")}
          </p>
        </div>

        <div className="space-y-3">
          <p>
            <strong>Status:</strong>{" "}
            {new Date(event.eventDate) > new Date() ? "Upcoming" : "Past"}
          </p>
          <p>
            <strong>Participants:</strong> —
          </p>
          <p>
            <strong>Additional Info:</strong> No extra rules provided
          </p>
        </div>
      </section>

      {/*  Ratings */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Ratings</h2>
        <div className="w-full h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={ratingsData}
              layout="vertical"
              margin={{ left: -20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={80} />
              <Tooltip />
              <Bar dataKey="count" fill="#632EE3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default EventDetails;
