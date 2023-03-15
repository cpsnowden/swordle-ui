import About from "pages/About";
import Wordle from "pages/Wordle";
import SingleSign from "pages/SingleSign";
import AppFooter from "layouts/Footer";
import InfoIcon from "@mui/icons-material/Info";
import SwipeDown from "@mui/icons-material/SwipeDown";
import FastForwardIcon from "@mui/icons-material/FastForward";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import {
  createHashRouter,
  Outlet,
  RouteObject,
  useLocation,
  Navigate,
} from "react-router-dom";
import QuickFire from "./QuickFire";
import AppStatusOverlay from "components/AppStatusOverlay";

export type PageInfo = {
  name: string;
  element?: React.ReactNode;
  icon: React.ReactNode;
  path: string;
};

const pages: (PageInfo & RouteObject)[] = [
  {
    name: "SingleSign",
    element: <SingleSign />,
    icon: <SwipeDown />,
    path: "/single-sign",
  },
  {
    name: "QuickFire",
    element: <QuickFire />,
    icon: <FastForwardIcon />,
    path: "/quickfire",
  },
  {
    name: "SWordle",
    element: <Wordle />,
    icon: <VideogameAssetIcon />,
    path: "/swordle",
  },
  {
    name: "About",
    element: <About />,
    icon: <InfoIcon />,
    path: "/",
  },
];

const Layout = () => {
  const match = useLocation();
  const page = pages.findIndex((item) => item.path === match.pathname);
  return (
    <>
      <AppStatusOverlay />
      <Outlet />
      <AppFooter pages={pages} selectedPageIndex={page} />
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
