import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
} from "@mui/material";
import { games } from "features/games";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GitHubIcon from "@mui/icons-material/GitHub";

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onHandReferenceClick: () => void;
  onPreferenceClick: () => void;
  onGitHubLinksClick: () => void;
}

export const NavMenu: FC<NavMenuProps> = ({
  isOpen,
  onClose,
  onHandReferenceClick,
  onPreferenceClick,
  onGitHubLinksClick,
}) => {
  const match = useLocation();
  const selectedPage = games.findIndex((item) => item.path === match.pathname);
  return (
    <>
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
        <Stack
          sx={{
            justifyContent: "space-between",
            display: "flex",
            height: "100vh",
          }}
        >
          <List disablePadding>
            {games.map((page, index) => (
              <div key={index}>
                <ListItem disablePadding>
                  <ListItemButton
                    to={page.path}
                    component={Link}
                    selected={index === selectedPage}
                  >
                    <ListItemIcon>{page.icon}</ListItemIcon>
                    <ListItemText
                      primary={page.name}
                      secondary={page.tagLine}
                    />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
          <Paper elevation={3}>
            <BottomNavigation showLabels>
              <BottomNavigationAction
                label="Settings"
                icon={<SettingsIcon />}
                onClick={onPreferenceClick}
              />
              <BottomNavigationAction
                label="ASL Reference"
                icon={<MenuBookIcon />}
                onClick={onHandReferenceClick}
              />
              <BottomNavigationAction
                label="Github"
                icon={<GitHubIcon />}
                onClick={onGitHubLinksClick}
              />
            </BottomNavigation>
          </Paper>
        </Stack>
      </Drawer>
    </>
  );
};
