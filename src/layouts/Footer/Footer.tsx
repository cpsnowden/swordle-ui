import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { PageInfo } from "pages";
import { Link } from "react-router-dom";

export interface FooterMenuProps {
  pages: PageInfo[]
  selectedPageIndex: number
}

export const FooterMenu = ({ pages, selectedPageIndex }: FooterMenuProps) => (

  <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
    <BottomNavigation
      showLabels
      value={selectedPageIndex}
    >
      {
        pages.map((value, i) => <BottomNavigationAction key={i} label={value.name} icon={value.icon} component={Link} to={value.path} />)
      }
    </BottomNavigation>
  </Paper>
);
