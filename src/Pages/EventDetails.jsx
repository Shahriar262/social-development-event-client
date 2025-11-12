import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const EventDetails = () => {
    const {id} = useParams()
    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)
    const {user} = useContext(AuthContext)

    useEffect(() => {
    fetch(`http://localhost:5000/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        
        setEvent(data.result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

    if (loading)
    return (
      <p className="text-center mt-10 font-semibold text-xl">Loading event...</p>
    );

    if (!event)
    return <p className="text-center mt-10 text-gray-600">Event not found</p>;

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow rounded-xl p-6">
      <img
        src={event?.thumbnailUrl}
        alt={event?.title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h2 className="text-2xl font-bold mt-4">{event?.title}</h2>
      <p className="mt-2"><strong>Description:</strong> {event?.description}</p>
      <p className="mt-2"><strong>Created By:</strong> {event?.createdBy}</p>
      <p className="mt-2">
        <strong>Location:</strong> {event?.location}
      </p>
      <p className='mt-2'>
        <strong>Date:</strong>{" "}
        {new Date(event?.eventDate).toLocaleDateString("en-CA")}
      </p>
      <p className='mt-2'>
        <strong>Type:</strong> {event?.eventType}
      </p>

      <button
        // onClick={handleJoin}
        className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
      >
        Join Event
      </button>
    </div>
    );
};

export default EventDetails;