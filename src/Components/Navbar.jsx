import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { FaHome } from "react-icons/fa";
import { MdLogin, MdLogout, MdUpcoming } from "react-icons/md";
import logoImg from "../assets/logo.png";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm md:px-[120px]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/"}>Home</Link>
            </li>

            <li>
              <Link to={"/upcoming-event"}>Upcoming Events</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={logoImg}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full"
            alt=""
          />
          <a className="md:text-xl font-bold">
            Serve<span className="text-purple-700">Bangla</span>
          </a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/"} className="font-semibold text-[15px] mr-2">
              <FaHome /> Home
            </Link>
          </li>

          <li>
            <Link to={"/upcoming-event"} className="font-semibold text-[15px]">
              <MdUpcoming /> Upcoming Events
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="mr-4">
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            defaultChecked={localStorage.getItem("theme") === "dark"}
            className="toggle"
          />
        </div>
        {!user ? (
          <Link
            to="/auth/login"
            className="btn bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white rounded-lg"
          >
            <MdLogin /> Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
              data-tip={user.displayName || "User"}
            >
              <div className="w-9 md:w-10 mr-1 rounded-full border border-gray-300">
                <img
                  src={
                    user.photoURL ||
                    "https://i.ibb.co/0jVpZVV/default-avatar.png"
                  }
                  alt="Profile"
                />
              </div>
            </div>

            {/* Dropdown menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/create-event">Create Event</Link>
              </li>
              <li>
                <Link to="/manage-event">Manage Events</Link>
              </li>
              <li>
                <Link to="/join-event">Joined Events</Link>
              </li>
              <li className="lg:hidden">
                <button
                  onClick={signOutUser}
                  className="btn bg-gradient-to-r from-[#632EE3] to-[#9F62F2] w-full text-white"
                >
                  <MdLogout /> Logout
                </button>
              </li>
            </ul>
            <button
              onClick={signOutUser}
              className="btn bg-gradient-to-r from-[#632EE3] to-[#9F62F2] rounded-lg text-white text-sm ml-4 hidden lg:inline-flex"
            >
              <MdLogout /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
