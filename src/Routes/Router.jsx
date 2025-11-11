import { createBrowserRouter } from "react-router";
import MainLayOut from "../Layout/MainLayOut";
import Home from "../Pages/Home";
import UpcomingEvent from "../Pages/UpcomingEvent";
import CreateEvent from "../Pages/CreateEvent";
import JoinedEvent from "../Pages/JoinedEvent";
import ManageEvent from "../Pages/ManageEvent";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import EventDetails from "../Pages/EventDetails";
import UpdateEvent from "../Pages/UpdateEvent";
import PrivateRoute from "./PrivateRoute";

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
        loader: () => fetch("http://localhost:5000/events"),
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
        path: "/join-event",
        element: (
          <PrivateRoute>
            <JoinedEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "/event-details/:id",
        element: <EventDetails />,
      },
      {
        path: "/update-event/:id",
        element: <UpdateEvent />,
      },
      {
        path: "/manage-event",
        element: (
          <PrivateRoute>
            <ManageEvent />
          </PrivateRoute>
        ),
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
]);
