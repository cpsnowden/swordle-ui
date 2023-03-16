import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Header from "layouts/Header";
import { games } from "pages";
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
    <Container className="mt-3 mb-3" maxWidth="sm">
      <Stack spacing={2}>
        {games.map((page, index) => (
          <GameCard
            key={index}
            name={page.name}
            description={page.tagLine!}
            image={""}
            path={page.path}
          />
        ))}
      </Stack>
    </Container>
  </>
);

export default About;
