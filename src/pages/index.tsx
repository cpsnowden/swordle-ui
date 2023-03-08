import Home from "pages/About";
import Wordle from "pages/Wordle"
import SingleSign from "./SingleSign";
import InfoIcon from '@mui/icons-material/Info';
import SwipeDown from '@mui/icons-material/SwipeDown'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';


export type PageInfo = {
  name: string,
  element?: React.ReactNode;
  icon: React.ReactNode
}

export const pages: PageInfo[] = [
    {
      name: 'About',
      element: <Home/>,
      icon: <InfoIcon />
    },
    {
      name: 'SingleSign',
      element: <SingleSign/>,
      icon: <SwipeDown/>
    },
    {
      name: 'SWordle',
      element: <Wordle/>,
      icon: <VideogameAssetIcon/>
    },
];
