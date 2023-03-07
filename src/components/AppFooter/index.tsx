import { Container, Grid, Typography } from "@mui/material";

const AppFooter = () => {
  return (
    <Typography
      component="footer"
      sx={{ display: 'flex', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ my: 8, display: 'flex' }}>
        <Grid container spacing={5}>
          A Melbourne Production
        </Grid>
        </Container>
    </Typography>
  )
};

export default AppFooter;
