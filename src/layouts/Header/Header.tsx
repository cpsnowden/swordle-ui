import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import AppMenu from "layouts/AppMenu";
import { pages } from "pages";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export interface HeaderProps {
  rightPanel?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ rightPanel }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          onClick={() => setOpen(true)}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <AppMenu pages={pages} isOpen={isOpen} onClose={() => setOpen(false)} />
        <Typography
          variant="h5"
          align="center"
          noWrap
          sx={{
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".2rem",
          }}
        >
          SWordle
        </Typography>
        {rightPanel}
      </Toolbar>
    </AppBar>
  );
};
