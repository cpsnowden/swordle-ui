import { DialogContentText } from "@mui/material";
import { BaseDialog } from "components/base-dialog";
import { FinishState } from "features/games/wordle/types";
import { FC } from "react";
import ConfettiExplosion from "react-confetti-explosion";

export interface ResultDialogProps {
  solution: string;
  onNextGame: () => void;
  finishState?: FinishState;
}

export const ResultDialog: FC<ResultDialogProps> = ({
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
