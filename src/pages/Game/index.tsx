import { Container, Grid, Skeleton } from "@mui/material";
import { WordleGrid } from "components/Wordle/grid/WordleGrid";

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
          <div className="mx-auto flex w-full grow flex-col px-1 pt-2 pb-8 sm:px-6 md:max-w-7xl lg:px-8 short:pb-2 short:pt-2">
            <div className="flex grow flex-col justify-center pb-6 short:pb-2">
              <WordleGrid guesses={guesses} isRevealing={false} />
              </div>
            </div>
        </Grid>
      </Grid>
    </Container>
  )
};

export default Game;
