import { games } from "features/games";
import { AboutPage } from "pages/AboutPage";
import { createHashRouter, Navigate } from "react-router-dom";

export const router = createHashRouter([
  {
    element: <AboutPage />,
    path: "/",
  },
  ...games,
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
