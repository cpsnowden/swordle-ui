import { AppBar, Box, Container, IconButton, Toolbar } from "@mui/material";
import AppMenu from "layouts/AppMenu";
import { pages } from "pages";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { ReactComponent as Logo } from "assets/swordle-logo.svg";

export interface HeaderProps {
  rightPanel?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ rightPanel }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "left" }}>
            <IconButton
              size="large"
              edge="start"
              onClick={() => setOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <AppMenu
            pages={pages}
            isOpen={isOpen}
            onClose={() => setOpen(false)}
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
