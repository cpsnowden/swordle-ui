import Home from "pages/Home";
import Game from "pages/Game"
import { createHashRouter, RouteObject } from "react-router-dom";
import PageTemplate from "layouts/PageLayout";

export type PageInfo = {
  name: string,
  path: string
}

type EnhancedRoute = RouteObject & PageInfo;

const routes: EnhancedRoute[] = [
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

const routesWithLayout: RouteObject[] = [
  {
    element: <PageTemplate/>,
    children: routes
  }
];

const hashRouter = createHashRouter(routesWithLayout)

export {
  hashRouter,
  routes
}
