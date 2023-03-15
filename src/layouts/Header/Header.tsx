import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

export interface HeaderProps {
  rightPanel?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ rightPanel }) => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ flex: 1 }}></Box>
          <Typography
            variant="h5"
            align="center"
            noWrap
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
            }}
          >
            SWordle
          </Typography>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "right" }}>
            {rightPanel}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
