import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import { imgUpload } from "../../utils";

const UpdateEvent = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(
          `https://social-development-event-server-mu.vercel.app/events/${id}`
        );
        const data = await res.json();
        setEvent(data.result);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch event data");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!event) return;

    setUpdating(true);

    try {
      // 🔹 Image handling
      let imageUrl = event.thumbnailUrl;
      const imageFile = e.target.image.files[0];
      if (imageFile) {
        imageUrl = await imgUpload(imageFile); // upload to imgBB
      }

      // 🔹 Form data
      const updatedEvent = {
        title: e.target.title.value,
        eventType: e.target.eventType.value,
        description: e.target.description.value,
        thumbnailUrl: imageUrl,
        location: e.target.location.value,
        eventDate: new Date(e.target.eventDate.value).toISOString(),
        userEmail: user.email,
      };

      // 🔹 API call to update
      const res = await fetch(
        `https://social-development-event-server-mu.vercel.app/events/${event._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedEvent),
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Event updated successfully!");
        setEvent({ ...event, ...updatedEvent }); // update local state
      } else {
        toast.error(data.message || "Failed to update event");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  if (!event)
    return <p className="text-center mt-10 text-gray-600">Event not found</p>;

  return (
    <div className="max-w-md w-[94%] md:w-full mx-auto mt-10 p-6 bg-base-100 shadow-2xl rounded-xl">
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

        {/* Image Upload */}
        <div>
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium"
          >
            Upload Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-purple-700 
                hover:file:bg-indigo-100
                bg-gray-100 border border-dashed border-indigo-300 rounded-md cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400
                py-2"
          />
          <p className="mt-1 text-xs text-gray-400">
            PNG, JPG or JPEG (max 2MB)
          </p>
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={updating}
          className={`btn w-full bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white rounded-full mt-4 ${
            updating ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {updating ? "Updating..." : "Update Event"}
        </button>
      </form>
    </div>
  );
};

export default UpdateEvent;
