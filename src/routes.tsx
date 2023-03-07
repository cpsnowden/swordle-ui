import Home from "pages/Home";
import Game from "pages/Game"
import { createHashRouter, RouteObject } from "react-router-dom";
import PageTemplate from "pages/PageTemplate";

type EnhancedRoute = RouteObject & {
  name: string
};

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
