import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logoImg from "../assets/logo.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-gray-200 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <div className="flex items-center gap-2">
            <img
            src={logoImg}
            className="w-7 h-7 rounded-full mb-3"
            alt=""
          />
          <h2 className="text-2xl font-bold mb-3 text-white">Serve<span className="text-purple-400">Bangla</span></h2>
          </div>
          <p className="text-gray-400">
            ServeBangla is a community-driven platform to create, join, and
            track social development events across Bangladesh. Join hands for a
            better tomorrow!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="/" className="hover:text-blue-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-400 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <a
                href="/create-event"
                className="hover:text-blue-400 transition-colors"
              >
                Create Event
              </a>
            </li>
            
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://X.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <FaXTwitter size={20} />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <FaInstagram size={20} />
            </a>
          </div>
          <p className="mt-5 text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ServeBangla. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
