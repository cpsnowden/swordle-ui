import { DialogContentText, List, ListItemText, Slider } from "@mui/material";
import { BaseDialog } from "components/base-dialog";
import { Level } from "features/games/quickfire/types";

interface RulesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  level: Level;
  onLevelChange: (level: Level) => void;
}

//TODO make this programatically
const marks = [
  {
    value: Level.Easy,
    label: Level[Level.Easy],
  },
  {
    value: Level.Medium,
    label: Level[Level.Medium],
  },
  {
    value: Level.Hard,
    label: Level[Level.Hard],
  },
  {
    value: Level.Insane,
    label: Level[Level.Insane],
  },
];

export const RulesDialog = ({
  isOpen,
  onClose: handleClose,
  level,
  onLevelChange: handleLevel,
}: RulesDialogProps) => {
  return (
    <BaseDialog
      title="How to play"
      isOpen={isOpen}
      onClose={handleClose}
      closeText="Close"
    >
      <DialogContentText>
        You have a fixed amount of time to sign a letter at random. For each
        correct letter you get <b>10</b> points and for each streak of <b>5</b>{" "}
        correct guesses, you get an additional <b>30</b> points.
      </DialogContentText>
      <List>
        <ListItemText>
          EASY: <b>5 seconds</b> to sign the letter with <b>1 retry</b> per
          letter.
        </ListItemText>
        <ListItemText>
          MEDIUM: <b>3 seconds</b> to sign the letter with <b>1 retry</b> per
          letter.
        </ListItemText>
        <ListItemText>
          HARD: <b>3 seconds</b> to sign the letter and you{" "}
          <b>don't get any retries.</b>
        </ListItemText>
        <ListItemText>
          INSANE: <b>1 second</b> to sign the letter and you{" "}
          <b>don't get any retries</b>.
        </ListItemText>
      </List>
      <Slider
        aria-label="Always visible"
        value={level}
        step={1}
        max={Level.Insane}
        marks={marks}
        valueLabelDisplay="off"
        onChangeCommitted={(_, value: number | number[]) => {
          handleLevel(value as Level);
        }}
      />
    </BaseDialog>
  );
};
