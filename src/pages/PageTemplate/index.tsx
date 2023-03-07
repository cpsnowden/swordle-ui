import AppFooter from "components/AppFooter";
import AppHeader from "components/AppHeader";
import { Outlet } from "react-router";

const PageTemplate = () => (
  <>
    <AppHeader />
    <Outlet />
    <AppFooter />
  </>
)

export default PageTemplate;
