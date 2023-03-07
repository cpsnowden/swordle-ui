import Home from "routes/Home";
import Game from "routes/Game"
import { createHashRouter, RouteObject } from "react-router-dom";
import PageTemplate from "routes/PageTemplate";

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
