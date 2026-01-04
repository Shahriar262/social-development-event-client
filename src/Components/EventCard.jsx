import React from "react";
import { Link } from "react-router";
import { IoLocationOutline, IoCalendarOutline } from "react-icons/io5";

const EventCard = ({ event }) => {
  const {
    title,
    thumbnailUrl,
    _id,
    createdBy,
    eventDate,
    location,
    eventType,
  } = event;

  return (
    <div className="bg-base-100 shadow-md rounded-xl overflow-hidden flex flex-col h-full hover:shadow-xl transition-transform duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="w-full h-48 md:h-56 overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Title */}
          <h2 className="font-semibold text-lg truncate">{title}</h2>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-2 mt-3 text-gray-600 text-xs">
            <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
              {eventType}
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100">
              <IoLocationOutline className="text-gray-500" /> {location}
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100">
              <IoCalendarOutline className="text-gray-500" />{" "}
              {new Date(eventDate).toLocaleDateString("en-CA")}
            </span>
          </div>

          {/* Created By */}
          <div className="text-xs mt-2">Added by: {createdBy}</div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/event-details/${_id}`}
          className="mt-4 w-full text-center bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:from-purple-600 hover:to-pink-500 text-white rounded-full py-2 text-sm transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
