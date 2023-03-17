import { AppBar, Box, Container, IconButton, Toolbar } from "@mui/material";
import AppMenu from "layouts/AppMenu";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { ReactComponent as Logo } from "assets/swordle-logo.svg";
import HandOverlay from "components/HandOverlay";
import PreferencesForm from "components/UserPreferences";

export interface HeaderProps {
  rightPanel?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ rightPanel }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isHandOverlayOpen, setHandOverlayOpen] = useState(false);
  const [isPreferencesOpen, setPreferencesOpen] = useState(false);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "left" }}>
            <IconButton
              size="large"
              edge="start"
              onClick={() => setMenuOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <AppMenu
            isOpen={isMenuOpen}
            onClose={() => setMenuOpen(false)}
            onHandOverlayClick={() => {
              setMenuOpen(false);
              setHandOverlayOpen(true);
            }}
            onPreferenceClick={() => {
              setMenuOpen(false);
              setPreferencesOpen(true);
            }}
          />
          <HandOverlay
            isOpen={isHandOverlayOpen}
            onClose={() => setHandOverlayOpen(false)}
          />
          <PreferencesForm
            isOpen={isPreferencesOpen}
            onClose={() => setPreferencesOpen(false)}
          />
          <Logo height={65} />
          <Box sx={{ flex: 1, display: "flex", justifyContent: "right" }}>
            {rightPanel}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
