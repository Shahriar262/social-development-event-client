import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";

const UpdateEvent = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://social-development-event-server-mu.vercel.app/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data.result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title: e.target.title.value,
      eventType: e.target.eventType.value,
      description: e.target.description.value,
      thumbnailUrl: e.target.thumbnailUrl.value,
      location: e.target.location.value,
      eventDate: new Date(e.target.eventDate.value).toISOString(),
      userEmail: user.email,
    };

    try {
      const res = await fetch(
        `https://social-development-event-server-mu.vercel.app/events/${event._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Event updated successfully!");
      } else {
        toast.error("Failed to update event");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading event...</p>;
  if (!event) return <p className="text-center mt-10">Event not found</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 shadow-2xl rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6">Update Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="label font-medium">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={event.title}
            required
            className="input w-full rounded-full"
          />
        </div>

        {/* Event Type */}
        <div>
          <label className="label font-medium">Event Type</label>
          <select
            name="eventType"
            defaultValue={event.eventType}
            required
            className="select w-full rounded-full"
          >
            <option value="">Select type</option>
            <option value="Cleanup">Cleanup</option>
            <option value="Plantation">Plantation</option>
            <option value="Donation">Donation</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="label font-medium">Description</label>
          <textarea
            name="description"
            defaultValue={event.description}
            required
            rows="4"
            className="textarea w-full rounded-2xl"
          ></textarea>
        </div>

        {/* Thumbnail URL */}
        <div>
          <label className="label font-medium">Thumbnail URL</label>
          <input
            type="url"
            name="thumbnailUrl"
            defaultValue={event.thumbnailUrl}
            required
            className="input w-full rounded-full"
          />
        </div>

        {/* Location */}
        <div>
          <label className="label font-medium">Location</label>
          <input
            type="text"
            name="location"
            defaultValue={event.location}
            required
            className="input w-full rounded-full"
          />
        </div>

        {/* Event Date */}
        <div>
          <label className="label font-medium">Event Date</label>
          <input
            type="date"
            name="eventDate"
            defaultValue={new Date(event.eventDate).toISOString().split("T")[0]}
            required
            className="input w-full rounded-full"
          />
        </div>

        <button
          type="submit"
          className="btn w-full bg-green-600 text-white rounded-full mt-4 hover:bg-green-700"
        >
          Update Event
        </button>
      </form>
    </div>
  );
};

export default UpdateEvent;
