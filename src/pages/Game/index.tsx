import { Container, Grid, Skeleton } from "@mui/material";
import { GamePanel } from "components/Wordle/grid/GamePanel";

const guesses: string[][] = [
  ["A", "B", "C", "D", "E"],
  ["A", "B", "C", "D", "E"],
  ["A", "B", "C", "D", "E"],
  ["A", "B", "C", "D", "E"],
  ["A", "B", "C", "D", "E"],
  ["A", "B", "C", "D", "E"]
]

const Game = () => {
  return (
    <Container>
      <Grid container alignItems="center"  direction="row" justifyContent="center">
        <Grid item xs={6}>
          <Skeleton variant="rectangular" width={1280 / 2.5} height={720 / 2.5} />
        </Grid>
        <Grid item xs={6}>
          <GamePanel guesses={guesses}/>
        </Grid>
      </Grid>
    </Container>
  )
};

export default Game;
