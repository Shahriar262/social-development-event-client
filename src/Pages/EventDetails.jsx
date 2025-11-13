import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [joining, setJoining] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`https://social-development-event-server-mu.vercel.app/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setEvent(data.result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleJoin = () => {
    if (!user?.email) {
      toast.error("You must logged in to join event!");
      navigate("/auth/login");
      return;
    }
    setJoining(true);

    fetch("https://social-development-event-server-mu.vercel.app/join-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
        if (data.success) {
          toast.success("Successfully joined this event!");
        } else {
          toast.error(data.message || "Failed to join event.");
        }
      })
      .catch((err) => {
        setJoining(false);
        toast.error("Something went wrong. Try again!");
        console.error(err);
      });
  };

  if (loading)
    return (
      <p className="text-center mt-10 font-semibold text-xl">
        Loading event...
      </p>
    );

  if (!event)
    return <p className="text-center mt-10 text-gray-600">Event not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-base-100 shadow-2xl rounded-xl p-6">
      <img
        src={event?.thumbnailUrl}
        alt={event?.title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h2 className="text-2xl font-bold mt-4">{event?.title}</h2>
      <p className="mt-2">
        <strong>Description:</strong>  {event?.description}
      </p>
      <p className="mt-2">
        <strong>Created By:</strong>  {event?.createdBy}
      </p>
      <p className="mt-2">
        <strong>Location:</strong>  {event?.location}
      </p>
      <p className="mt-2">
        <strong>Date:</strong>{" "}
         {new Date(event?.eventDate).toLocaleDateString("en-CA")}
      </p>
      <p className="mt-2">
        <strong>Event Type:</strong>  {event?.eventType}
      </p>

      <button
        onClick={handleJoin}
        disabled={joining}
        className={`mt-5 px-5 py-2 rounded-lg text-white w-full ${
          joining
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:from-gray-600 hover:to-gray-500"
        }`}
      >
        {joining ? "Joining..." : "Join Event"}
      </button>
    </div>
  );
};

export default EventDetails;
