import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./dashboard";
import ProfilePage from "./pages/profile";
import SettingsPage from "./pages/settings";
import NewsPage from "./pages/news";

// ROUTER //

//initialisation of the router, list of routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        index: true,
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        index: true,
        path: "/settings",
        element: <SettingsPage />,
      },
      {
        index: true,
        path: "/news",
        element: <NewsPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
