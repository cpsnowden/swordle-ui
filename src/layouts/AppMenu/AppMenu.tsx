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
import PreferencesForm from "components/UserPreferences";
import { games } from "pages";
import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";

interface AppMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppMenu: FC<AppMenuProps> = ({ isOpen, onClose }) => {
  const match = useLocation();
  const selectedPage = games.findIndex((item) => item.path === match.pathname);
  const [isSettingsOpen, setSettingOpen] = useState(false);
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
          <List>
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
            <Divider />
          </List>
          <Paper elevation={3}>
            <BottomNavigation showLabels>
              <BottomNavigationAction
                label="Settings"
                icon={<SettingsIcon />}
                onClick={() => setSettingOpen(true)}
              />
            </BottomNavigation>
          </Paper>
        </Stack>
      </Drawer>
      <PreferencesForm
        isOpen={isSettingsOpen}
        onClose={() => setSettingOpen(false)}
      />
    </>
  );
};
