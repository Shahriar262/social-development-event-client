import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [eventDate, setEventDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("You must be logged in to create an event!");
      return;
    }

    if (!eventDate || eventDate < new Date()) {
      toast.error("Please select a valid future event date!");
      return;
    }

    setLoading(true);

    const formData = {
      title: e.target.title.value,
      eventType: e.target.eventType.value,
      description: e.target.description.value,
      thumbnailUrl: e.target.thumbnailUrl.value,
      createdBy: user?.email,
      location: e.target.location.value,
      eventDate: eventDate.toISOString(),
    };

    fetch("http://localhost:5000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.insertedId || data.success) {
          toast.success("Event created successfully!");
          navigate("/upcoming-event");
          return;
        }

        toast.error("Failed to create event. Try again!");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create New Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="label font-medium">Title</label>
            <input
              type="text"
              name="title"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter name"
            />
          </div>

          {/* Events Dropdown */}
          <div>
            <label className="label font-medium">Events</label>
            <select
              defaultValue={""}
              name="eventType"
              required
              className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
            >
              <option value="" disabled>
                Event types
              </option>
              <option value="Cleanup">Cleanup</option>
              <option value="Plantation">Plantation</option>
              <option value="Donation">Donation</option>
            </select>
          </div>

          {/* Description Textarea */}
          <div>
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              required
              rows="3"
              className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
              placeholder="Enter description"
            ></textarea>
          </div>

           <div>
            <label className="label font-medium">Location</label>
            <input
              type="text"
              name="location"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter location"
            />
          </div>

          
          {/* event date */}
          <div>
            <label className="label font-medium">Event Date</label>
            <DatePicker
              selected={eventDate}
              onChange={(date) => setEventDate(date)}
              minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select event date"
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              required
            />
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="label font-medium">Thumbnail URL</label>
            <input
              type="url"
              name="thumbnailUrl"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-linear-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700"
          >
            {loading ? "Creating..." : "Add Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
