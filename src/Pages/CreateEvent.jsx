import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { imgUpload } from "../utils";

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [eventDate, setEventDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("You must be logged in to create an event!");
      return;
    }

    if (!eventDate || eventDate < new Date()) {
      toast.error("Please select a valid future event date!");
      return;
    }

    const imageFile = e.target.image.files[0];
    if (!imageFile) {
      toast.error("Please select an image!");
      return;
    }

    try {
      setLoading(true);

      // 1. Upload image to ImgBB
      const imageUrl = await imgUpload(imageFile);

      // 2. Prepare event data
      const formData = {
        title: e.target.title.value,
        eventType: e.target.eventType.value,
        description: e.target.description.value,
        thumbnailUrl: imageUrl, 
        createdBy: user.email,
        location: e.target.location.value,
        eventDate: eventDate.toISOString(),
      };

      // 3. Send data to backend using fetch
      const res = await fetch(
        "https://social-development-event-server-mu.vercel.app/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      setLoading(false);

      if (data.insertedId || data.success) {
        toast.success("Event created successfully!");
        navigate("/upcoming-event");
      } else {
        toast.error("Failed to create event!");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Something went wrong!");
    }
  };


  return (
    <div className="card bg-base-100 mt-10 w-[94%] md:w-full max-w-md mx-auto shadow-2xl rounded-2xl">
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

          {/* Add Image */}
          <div>
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium"
            >
              Add Image
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

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:from-gray-600 hover:to-gray-500 cursor-pointer"
          >
            {loading ? "Creating..." : "Add Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
