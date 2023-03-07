import AppFooter from "layouts/Footer";
import Header from "layouts/Header";
import { routes } from "pages";
import { Outlet } from "react-router";

export const PageTemplate = () => (
  <>
    <Header pages={routes}  />
    <Outlet />
    <AppFooter />
  </>
)
