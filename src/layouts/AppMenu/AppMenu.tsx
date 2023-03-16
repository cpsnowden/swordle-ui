import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { PageInfo } from "pages";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

interface AppMenuProps {
  pages: PageInfo[];
  isOpen: boolean;
  onClose: () => void;
}

export const AppMenu: FC<AppMenuProps> = ({ pages, isOpen, onClose }) => {
  const match = useLocation();
  const selectedPage = pages.findIndex((item) => item.path === match.pathname);
  return (
    <Drawer
      variant="temporary"
      open={isOpen}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: 300,
        "& .MuiDrawer-paper": {
          width: 300,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        {pages.map((page, index) => (
          <>
            <ListItem key={index} disablePadding>
              <ListItemButton
                to={page.path}
                component={Link}
                selected={index === selectedPage}
              >
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={page.name} secondary={page.tagLine} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Drawer>
  );
};
