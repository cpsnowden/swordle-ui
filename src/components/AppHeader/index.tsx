import { AppBar, Box, Container, Link, Toolbar, Typography } from "@mui/material"
import { routes } from "routes";
import { Link as RouterLink } from "react-router-dom";

const AppHeader = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                SLORDLE
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {
                routes.map(route => (
                  <Link
                    key={route.path}
                    color="inherit"
                    variant="h6"
                    underline="none"
                    sx={{ fontSize: 16, color: 'common.white', ml: 3, }}
                    to={route.path!}
                    component={RouterLink}
                  >
                  {route.name}
                  </Link>
                ))
              }
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
};

export default AppHeader;
