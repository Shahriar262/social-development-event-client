import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router";

const EventCard = ({ event }) => {
  const {
    title,
    thumbnailUrl,
    eventType,
    description,
    _id,
    createdBy,
    location,
  } = event;

  return (
    <div>
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-[420px] flex flex-col">
        {/* fixed image container */}
        <figure className="w-full aspect-[16/9] overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </figure>

        <div className="card-body flex flex-col justify-between">
          <div>
            <h2 className="card-title mb-3 text-base">{title}</h2>

           
              <span className="px-3 py-0.5 text-xs font-medium bg-pink-100 text-pink-600 rounded-full">
                {eventType}
              </span>
              <span className="flex items-center gap-2 px-3 py-1 mt-3 text-xs font-medium bg-gray-100 text-gray-600 rounded-full max-w-[80%] truncate">
                <IoLocationOutline className="text-gray-500" />
                {location}
              </span>
            

            <div className="text-xs text-pink-500 mt-3">
              Added By: <b>{createdBy}</b>
            </div>

            <p className="line-clamp-1 text-sm mt-3">{description}</p>
          </div>

          <div className="card-actions justify-end mt-4">
            <Link
              className="btn rounded-full bg-gradient-to-r from-pink-500 to-red-600 hover:from-red-600 hover:to-pink-500 text-white w-full btn-sm"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
