import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./Pages/Home";
import UserProfile from "./Pages/UserProfile";
import { SignUp } from "./Pages/SignUp";
import ReservePage from "./Pages/ReservePage";
import { About } from "./Pages/About";
import { NotFound } from "./Pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/userprofile",
    element: <UserProfile />,
    errorElement: <NotFound />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <NotFound />,
  },
  {
    path: "/reservepage",
    element: <ReservePage />,
    errorElement: <NotFound />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
