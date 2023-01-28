import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "./components/Layout";
import "./index.css";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Index } from "./pages/index";
import { Create } from "./pages/create";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Index />,
        index: true,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/:id",
        element: <div>Show</div>,
      },
      {
        path: "/:id/edit",
        element: <div>Edit</div>,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
