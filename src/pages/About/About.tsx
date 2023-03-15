import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  List,
  ListItem,
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
    <Container className="mt-3 mb-3">
      <List style={{ maxHeight: "100%", overflow: "auto" }}>
        <ListItem>
          <GameCard
            name="SingleSign"
            description="Your personal AI interpreter will check what sign you are making"
            image={""}
            path="single-sign"
          />
        </ListItem>
        <ListItem>
          <GameCard
            name="QuickFire"
            description="Test your signs against the clock, level up and try INSANE mode"
            image={""}
            path="quickfire"
          />
        </ListItem>
        <ListItem>
          <GameCard
            name="SWordle"
            description="The namesake, OG - play the popular word game using your sign skills"
            image={""}
            path="swordle"
          />
        </ListItem>
      </List>
    </Container>
  </>
);

export default About;
