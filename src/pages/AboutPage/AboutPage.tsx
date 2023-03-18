import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { PageLayout } from "features/layout/page-layout";
import { games } from "pages";
import { FC } from "react";
import { Link } from "react-router-dom";

interface GameCardProps {
  name: string;
  tagLine: string;
  path: string;
}

const GameCard: FC<GameCardProps> = ({ path, tagLine, name }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tagLine}
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

export const AboutPage = () => (
  <PageLayout>
    <Container maxWidth="sm">
      <Stack spacing={2}>
        {games.map((game, index) => (
          <GameCard
            key={index}
            name={game.name}
            tagLine={game.tagLine}
            path={game.path}
          />
        ))}
      </Stack>
    </Container>
  </PageLayout>
);
