import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { FaUsers, FaTasks, FaUser } from "react-icons/fa";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { IoMenu } from "react-icons/io5";
import logoImg from "../assets/logo.png";
import { ToastContainer } from "react-toastify";

const DashboardLayout = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false); 

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate("/auth/login");
    } catch (err) {
      console.log(err);
    }
  };

  const activeLinkStyle = "bg-purple-500 text-white rounded-lg";
  const normalLinkStyle =
    "hover:bg-purple-200 hover:text-purple-700 rounded-lg";

  return (
    <div className="flex min-h-screen bg-base-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-base-100 shadow-md flex flex-col transform transition-transform duration-300 z-50
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
      >
        <div className="p-6 flex items-center gap-2">
          <h1 className="text-2xl font-bold text-purple-600">Dashboard</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {/* <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 font-medium ${
                isActive ? activeLinkStyle : normalLinkStyle
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            Home
          </NavLink> */}
          <NavLink
            to="/dashboard/joined-events"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 font-medium ${
                isActive ? activeLinkStyle : normalLinkStyle
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FaUsers /> Joined Events
          </NavLink>
          <NavLink
            to="/dashboard/manage-events"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 font-medium ${
                isActive ? activeLinkStyle : normalLinkStyle
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FaTasks /> Manage Events
          </NavLink>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 font-medium ${
                isActive ? activeLinkStyle : normalLinkStyle
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FaUser /> Profile
          </NavLink>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top Navbar */}
        <header className="flex justify-between items-center bg-base-100 shadow px-4 md:px-6 py-3 sticky top-0 z-50">
          <div className="flex items-center gap-1 md:gap-2">
            {/* Mobile burger menu */}
            <button
              className="md:hidden btn btn-ghost p-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <IoMenu className="text-2xl" />
            </button>
            <img
              src={logoImg}
              alt="ServeBangla"
              className="w-8 h-8 rounded-full"
            />
            <Link to="/" className="md:text-xl font-bold">
              Serve<span className="text-purple-700">Bangla</span>
            </Link>
          </div>

          <div className="flex items-center gap-4 relative">
            {/* Theme toggle */}
            <input
              type="checkbox"
              className="toggle"
              defaultChecked={theme === "dark"}
              onChange={(e) => handleTheme(e.target.checked)}
            />

            {/* Desktop Welcome text */}
            <h2 className="text-lg font-medium hidden sm:block">
              Welcome, {user?.displayName}
            </h2>

            {/* Profile avatar */}
            <div className="relative">
              <button
                className="w-10 h-10 rounded-full border-2 border-purple-500 overflow-hidden"
                onClick={() => setProfileDropdown(!profileDropdown)}
              >
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/0jVpZVV/default-avatar.png"
                  }
                  alt={user?.displayName}
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Dropdown menu */}
              {profileDropdown && (
                <ul className="absolute right-0 mt-2 w-40 bg-base-100 shadow-md rounded-lg py-2 z-50">
                  <li>
                    <Link
                      to="/dashboard/profile"
                      className="block px-4 py-2 hover:bg-purple-100"
                      onClick={() => setProfileDropdown(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 md:p-6 flex-1 bg-base-300 min-h-[calc(100vh-56px)]">
          <Outlet />
        </main>

        <ToastContainer />
      </div>
    </div>
  );
};

export default DashboardLayout;
