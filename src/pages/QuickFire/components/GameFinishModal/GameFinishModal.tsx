import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { GameStats, Level } from "pages/QuickFire/types";

export interface GameFinishModalProps {
  isOpen: boolean;
  gameStats: GameStats;
  level: Level;
  onNextGame: () => void;
}

export const GameFinishModal: React.FC<GameFinishModalProps> = ({
  isOpen,
  onNextGame,
  gameStats,
}) => (
  <Dialog open={isOpen}>
    <DialogTitle>Great job, here are your game stats...</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Score: {gameStats.score}
        Streaks: {gameStats.nStreaks}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onNextGame}>Play Again</Button>
    </DialogActions>
  </Dialog>
);
