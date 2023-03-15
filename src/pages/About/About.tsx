import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Header from "layouts/Header";
import { Link } from "react-router-dom";

interface GameCardProps {
  name: string;
  description: string;
  image: string;
  path: string;
}

const GameCard: React.FC<GameCardProps> = ({
  image,
  path,
  description,
  name,
}) => {
  return (
    <Card variant="outlined">
      {/* <CardMedia
        sx={{ height: 140 }}
        image={image}
        // image="/static/images/cards/contemplative-reptile.jpg"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={path}>
          Play
        </Button>
      </CardActions>
    </Card>
  );
};

const About = () => (
  <>
    <Header />
    <Container className="mt-3 mb-3" maxWidth="md">
      {/* Try to use a stack */}
      <Grid container spacing={4} alignContent="center" justifyContent="center">
        <Grid item key={1} xs={12} sm={12} md={4}>
          <GameCard
            name="SingleSign"
            description="Your personal AI interpreter will check what sign you are making"
            image={""}
            path="single-sign"
          />
        </Grid>
        <Grid item key={2} xs={12} sm={12} md={4}>
          <GameCard
            name="QuickFire"
            description="Test your signs against the clock, level up and try INSANE mode"
            image={""}
            path="quickfire"
          />
        </Grid>
        <Grid item key={3} xs={12} sm={12} md={4}>
          <GameCard
            name="SWordle"
            description="The namesake, OG - play the popular word game using your sign skills"
            image={""}
            path="swordle"
          />
        </Grid>
      </Grid>
    </Container>
  </>
);

export default About;
