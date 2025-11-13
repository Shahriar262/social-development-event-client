import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#050814] text-gray-200 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-3 text-white">ServeBangla</h2>
          <p className="text-gray-400">
            ServeBangla is a community-driven platform to create, join, and track social development events across Bangladesh. Join hands for a better tomorrow!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="/" className="hover:text-blue-400 transition-colors">Home</a>
            </li>
            <li>
              <a href="/upcoming-event" className="hover:text-blue-400 transition-colors">Upcoming Events</a>
            </li>
            <li>
              <a href="/create-event" className="hover:text-blue-400 transition-colors">Create Event</a>
            </li>
            <li>
              <a href="/manage-event" className="hover:text-blue-400 transition-colors">Manage Events</a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              <FaInstagram size={20} />
            </a>
          </div>
          <p className="mt-5 text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ServeBangla. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
