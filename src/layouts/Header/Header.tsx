import { AppBar, Box, Container, Link, Toolbar, Typography } from "@mui/material"
import { PageInfo } from "pages";
import { Link as RouterLink } from "react-router-dom";

export interface HeaderProps {
  pages: PageInfo[]
}

export const Header: React.FC<HeaderProps> = ({pages}) => {
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
                pages.map(page => (
                  <Link
                    key={page.name}
                    color="inherit"
                    variant="h6"
                    underline="none"
                    sx={{ fontSize: 16, color: 'common.white', ml: 3, }}
                    to={page.path!}
                    component={RouterLink}
                  >
                  {page.name}
                  </Link>
                ))
              }
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
};
