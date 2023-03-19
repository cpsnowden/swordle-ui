import { AppBar, Box, Container, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ReactComponent as Logo } from "assets/swordle-logo.svg";
import { Link } from "react-router-dom";
import { FC } from "react";
export interface HeaderProps {
  rightPanel?: React.ReactNode;
  onAppMenuClick: () => void;
}

export const Header: FC<HeaderProps> = ({ rightPanel, onAppMenuClick }) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "left" }}>
            <IconButton
              size="large"
              edge="start"
              onClick={onAppMenuClick}
              sx={{ mr: 2, color: "white" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box to="/" component={Link}>
            <Logo height={65} />
          </Box>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "right" }}>
            {rightPanel}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
