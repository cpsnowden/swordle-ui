import { Container, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Typography
      component="footer"
      sx={{ display: 'flex', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ my: 8, display: 'flex' }}>
        Footer Text
      </Container>
    </Typography>
  )
};
