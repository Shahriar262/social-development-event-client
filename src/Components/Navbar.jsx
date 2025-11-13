import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(()=> {
    const html = document.querySelector("html")
    html.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const handleTheme = (checked)=>{
    setTheme(checked ? "dark" : "light")
  }

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
              <a>Home</a>
            </li>

            <li>
              <a>Upcoming Events</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">ServeBangla</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/"} className="font-semibold text-[15px]">
              Home
            </Link>
          </li>

          <li>
            <Link to={"/upcoming-event"} className="font-semibold text-[15px]">
              Upcoming Events
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
          <Link to="/auth/login" className="btn">
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
              data-tip={user.displayName || "User"}
            >
              <div className="w-10 rounded-full border border-gray-300">
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
            </ul>
            <button
              onClick={signOutUser}
              className="btn btn-outline btn-error rounded-full text-sm ml-4"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
