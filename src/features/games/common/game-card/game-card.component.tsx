import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

interface GameCardProps {
  name: string;
  tagLine: string;
  path: string;
}

export const GameCard: FC<GameCardProps> = ({ path, tagLine, name }) => (
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
