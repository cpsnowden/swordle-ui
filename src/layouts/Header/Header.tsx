import { AppBar, Container, Toolbar, Typography } from "@mui/material";

export interface HeaderProps {
  rightPanel?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ rightPanel }) => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SWordle
          </Typography>
          {rightPanel}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
