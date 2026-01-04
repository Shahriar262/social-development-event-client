import { createBrowserRouter } from "react-router";
import MainLayOut from "../Layout/MainLayOut";
import Home from "../Pages/Home";
import UpcomingEvent from "../Pages/UpcomingEvent";
import CreateEvent from "../Pages/CreateEvent";
import JoinedEvent from "../Pages/Dashboard/JoinedEvent";
import ManageEvent from "../Pages/Dashboard/ManageEvent";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import EventDetails from "../Pages/EventDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import Profile from "../Pages/Dashboard/Profile";
import DashboardLayout from "../Layout/DashboardLayout";
import UpdateEvent from "../Pages/Dashboard/UpdateEvent";
import About from "../Pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/upcoming-event",
        element: <UpcomingEvent />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/create-event",
        element: (
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        ),
      },

      {
        path: "/event-details/:id",
        element: <EventDetails />,
      },

      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "", element: <DashboardHome /> },
      { path: "profile", element: <Profile /> },
      { path: "joined-events", element: <JoinedEvent /> },
      { path: "manage-events", element: <ManageEvent /> },
      { path: "update-event/:id", element: <UpdateEvent /> },
    ],
  },
]);
