import { DialogContentText, Link } from "@mui/material";
import { BaseDialog } from "components/base-dialog";
import { FC } from "react";
import { Cell } from "../grid/cell";

interface RulesDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesDialog: FC<RulesDialogProps> = ({
  isOpen,
  onClose,
}: RulesDialogProps) => {
  return (
    <BaseDialog
      title="How to play"
      isOpen={isOpen}
      onClose={onClose}
      closeText={"Close"}
    >
      <DialogContentText>
        Guess the word in 6 tries. After each guess, the color of the tiles will
        change to show how close your guess was to the word.
      </DialogContentText>

      <div className="mb-2 mt-2 flex justify-center">
        <Cell isRevealing isCompleted value="W" status="correct" />
        <Cell value="E" isCompleted />
        <Cell value="A" isCompleted />
        <Cell value="R" isCompleted />
        <Cell value="Y" isCompleted />
      </div>

      <DialogContentText>
        The letter W is in the word and in the correct spot.
      </DialogContentText>

      <div className="mb-2 mt-2 flex justify-center">
        <Cell value="P" isCompleted />
        <Cell value="I" isCompleted />
        <Cell isRevealing isCompleted value="L" status="present" />
        <Cell value="O" isCompleted />
        <Cell value="T" isCompleted />
      </div>

      <DialogContentText>
        The letter L is in the word but in the wrong spot.
      </DialogContentText>

      <div className="mb-2 mt-2 flex justify-center">
        <Cell value="V" isCompleted />
        <Cell value="A" isCompleted />
        <Cell value="G" isCompleted />
        <Cell isRevealing isCompleted value="U" status="absent" />
        <Cell value="E" isCompleted />
      </div>

      <DialogContentText>
        The letter U is not in the word in any spot.
      </DialogContentText>

      <DialogContentText sx={{ mt: 2, fontStyle: "italic", fontSize: 10 }}>
        Based on the{" "}
        <Link href="https://github.com/cwackerfuss/react-wordle">
          open source version
        </Link>{" "}
        of the word game.
      </DialogContentText>
    </BaseDialog>
  );
};
