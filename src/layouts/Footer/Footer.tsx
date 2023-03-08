import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { PageInfo } from "pages";

export interface FooterMenuProps {
    pages: PageInfo[]
    selectedPageIndex: number
    onSelectPage(pageIndex: number): void
}

export const FooterMenu = ({pages, selectedPageIndex, onSelectPage}: FooterMenuProps) => (

  <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
    <BottomNavigation
      showLabels
      value={selectedPageIndex}
      onChange={(_event, newValue) => {
        onSelectPage(newValue);
      }}
    >
      {
        pages.map((value, i) =>  <BottomNavigationAction key={i} label={value.name} icon={value.icon} />)
      }
    </BottomNavigation>
  </Paper>
);
