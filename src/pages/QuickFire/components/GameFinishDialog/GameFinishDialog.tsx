import { Box, Paper } from "@mui/material";
import { BaseDialog } from "components/base-dialog";
import { GameStats, Level } from "pages/QuickFire/types";
import { FC } from "react";

interface ScoreSquareProps {
  score: string;
  scoreValue: number;
}

const ScoreSquare: FC<ScoreSquareProps> = ({ score, scoreValue }) => (
  <Paper elevation={3} style={{ textAlign: "center", width: 100, height: 100 }}>
    <h3 className="m-2">{score}</h3>
    <h1 className="m-0">{scoreValue}</h1>
  </Paper>
);

export interface GameFinishDialogProps {
  isOpen: boolean;
  gameStats: GameStats;
  level: Level;
  onNextGame: () => void;
}

export const GameFinishDialog: React.FC<GameFinishDialogProps> = ({
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
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
        },
      }}
    >
      <ScoreSquare score="Score" scoreValue={gameStats.score} />
      <ScoreSquare score="Streaks" scoreValue={gameStats.nStreaks} />
    </Box>
  </BaseDialog>
);
