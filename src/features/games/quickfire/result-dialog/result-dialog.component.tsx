import { Paper, Stack } from "@mui/material";
import { BaseDialog } from "components/base-dialog";
import { GameStats, Level } from "features/games/quickfire/types";
import { FC } from "react";

interface ScoreSquareProps {
  scoreName: string;
  scoreValue: number;
}

const ScoreSquare: FC<ScoreSquareProps> = ({
  scoreName: score,
  scoreValue,
}) => (
  <Paper elevation={3} style={{ textAlign: "center", width: 100, height: 100 }}>
    <h3 className="m-2">{score}</h3>
    <h1 className="m-0">{scoreValue}</h1>
  </Paper>
);

export interface ResultDialogProps {
  isOpen: boolean;
  gameStats: GameStats;
  level: Level;
  onNextGame: () => void;
}

export const ResultDialog: FC<ResultDialogProps> = ({
  isOpen,
  onNextGame,
  gameStats,
}) => (
  <BaseDialog
    isOpen={isOpen}
    title="Game Statistics"
    closeText="Play again"
    onClose={onNextGame}
  >
    <Stack direction="row" justifyContent="center" spacing={2}>
      <ScoreSquare scoreName="Score" scoreValue={gameStats.score} />
      <ScoreSquare scoreName="Streaks" scoreValue={gameStats.nStreaks} />
    </Stack>
  </BaseDialog>
);
