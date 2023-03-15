import { DialogContentText } from "@mui/material";
import BaseModal from "components/BaseModal";
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
  <BaseModal
    isOpen={isOpen}
    title="Great job, here are your game stats..."
    closeText="Play again"
    onClose={onNextGame}
  >
    <DialogContentText>
      Score: {gameStats.score}
      Streaks: {gameStats.nStreaks}
    </DialogContentText>
  </BaseModal>
);
