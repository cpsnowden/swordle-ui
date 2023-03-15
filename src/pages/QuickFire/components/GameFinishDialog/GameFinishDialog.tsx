import { DialogContentText } from "@mui/material";
import BaseDialog from "components/BaseDialog";
import { GameStats, Level } from "pages/QuickFire/types";

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
    title="Great job, here are your game stats..."
    closeText="Play again"
    onClose={onNextGame}
  >
    <DialogContentText>
      Score: {gameStats.score}
      Streaks: {gameStats.nStreaks}
    </DialogContentText>
  </BaseDialog>
);
