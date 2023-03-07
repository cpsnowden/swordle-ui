import Home from "pages/Home";
import Game from "pages/Game"
import { createHashRouter, RouteObject } from "react-router-dom";
import PageTemplate from "layouts/PageLayout";

export type PageInfo = {
  name: string,
  path: string
}

const routes: (RouteObject & PageInfo)[] = [
    {
      name: 'Home',
      path: '/',
      element: <Home/>,
    },
    {
      name: 'Game',
      path: '/game',
      element: <Game/>,
    },
];

const router = createHashRouter([
  {
    element: <PageTemplate/>,
    children: routes
  }
])

export {
  router,
  routes
}
