import About from "pages/About";
import Wordle from "pages/Wordle";
import SingleSign from "pages/SingleSign";
import InfoIcon from "@mui/icons-material/Info";
import SwipeDown from "@mui/icons-material/SwipeDown";
import FastForwardIcon from "@mui/icons-material/FastForward";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import {
  createHashRouter,
  Outlet,
  RouteObject,
  Navigate,
} from "react-router-dom";
import QuickFire from "./QuickFire";
import AppStatusOverlay from "components/AppStatusOverlay";

export type PageInfo = {
  name: string;
  element?: React.ReactNode;
  icon: React.ReactNode;
  path: string;
  tagLine?: string;
};

export const games: (PageInfo & RouteObject)[] = [
  {
    name: "SingleSign",
    element: <SingleSign />,
    icon: <SwipeDown />,
    path: "/single-sign",
    tagLine: "Your personal AI interpreter will check what sign you are making",
  },
  {
    name: "QuickFire",
    element: <QuickFire />,
    icon: <FastForwardIcon />,
    path: "/quickfire",
    tagLine: "Test your signs against the clock, level up and try INSANE mode",
  },
  {
    name: "SWordle",
    element: <Wordle />,
    icon: <VideogameAssetIcon />,
    path: "/swordle",
    tagLine: "The namesake - play the popular word game using your sign skills",
  },
];

export const pages: (PageInfo & RouteObject)[] = [
  {
    name: "About",
    element: <About />,
    icon: <InfoIcon />,
    path: "/",
  },
  ...games,
];

const Layout = () => {
  return (
    <>
      <AppStatusOverlay />
      <Outlet />
      {/* <AppFooter pages={pages} selectedPageIndex={page} /> */}
    </>
  );
};

export const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      ...pages,
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
]);
