import { DialogContentText } from "@mui/material";
import { BaseDialog } from "components/base-dialog";
import { FinishState } from "pages/Wordle/types";
import ConfettiExplosion from "react-confetti-explosion";

export interface GameFinishDialogProps {
  solution: string;
  onNextGame: () => void;
  finishState?: FinishState;
}

export const GameFinishDialog: React.FC<GameFinishDialogProps> = ({
  onNextGame,
  solution,
  finishState,
}) => {
  const won = finishState === "WIN";
  const title = won ? "😀 You have won" : "😬 You have lost";
  return (
    <BaseDialog
      isOpen={!!finishState}
      title={title}
      closeText="Play again"
      onClose={onNextGame}
    >
      {won && <ConfettiExplosion />}
      <DialogContentText>The word was '{solution}'</DialogContentText>
    </BaseDialog>
  );
};
