import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "./components/Layout";
import "./index.css";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { CreateNote } from "./components/CreateNote";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/create",
        element: <CreateNote />,
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
