import { RouteObject } from "react-router-dom";
import { Wordle } from "features/games/wordle";
import { SingleSign } from "features/games/singlesign";
import { QuickFire } from "features/games/quickfire";
import SwipeDown from "@mui/icons-material/SwipeDown";
import FastForwardIcon from "@mui/icons-material/FastForward";
import GridOnIcon from "@mui/icons-material/GridOn";

export type GameInfo = {
  name: string;
  icon: React.ReactNode;
  path: string;
  tagLine: string;
};

export const games: (GameInfo & RouteObject)[] = [
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
    icon: <GridOnIcon />,
    path: "/swordle",
    tagLine: "The namesake - play the popular word game using your sign skills",
  },
];
