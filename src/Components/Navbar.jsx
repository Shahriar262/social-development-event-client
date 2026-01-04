import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { MdLogin, MdLogout, MdOutlineUpcoming } from "react-icons/md";
import logoImg from "../assets/logo.png";
import { toast } from "react-toastify";
import { IoAddCircleOutline, IoHomeOutline } from "react-icons/io5";

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

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        toast.success("Logged out successfully!");
      })
      .catch(() => {
        toast.error("Failed to log out!");
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm md:px-[120px] fixed top-0 left-0 w-full z-50">
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

            <li>
              <Link to={"/create-event"}>Create Event</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={logoImg}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full"
            alt=""
          />
          <Link to="/" className="md:text-xl font-bold">
            Serve<span className="text-purple-700">Bangla</span>
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/"} className="font-semibold text-[15px] mr-2">
              <IoHomeOutline /> Home
            </Link>
          </li>

          <li>
            <Link to={"/upcoming-event"} className="font-semibold text-[15px]">
              <MdOutlineUpcoming /> Upcoming Events
            </Link>
          </li>
          <li>
            <Link to="/create-event" className="font-semibold text-[15px]">
              {" "}
              <IoAddCircleOutline /> Create Event
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
                <Link to="/dashboard/manage-events">Manage Events</Link>
              </li>
              <li>
                <Link to="/dashboard/joined-events">Joined Events</Link>
              </li>
              <li className="">
                <button
                  onClick={handleLogout}
                  className="btn bg-gradient-to-r from-[#632EE3] to-[#9F62F2] w-full text-white"
                >
                  <MdLogout /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
