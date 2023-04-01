import { DialogContentText } from "@mui/material";
import { BaseDialog } from "components/base-dialog";

interface RulesDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesDialog = ({
  isOpen,
  onClose: handleClose,
}: RulesDialogProps) => {
  return (
    <BaseDialog
      title="Instructions"
      isOpen={isOpen}
      onClose={handleClose}
      closeText="Close"
    >
      <DialogContentText>
        Practice your ASL! Make an ASL sign when the countdown hits zero and the
        SWordle model will give you its prediction. Check the reference at the
        bottom of the menu for a ASL guide.
        <br />
        <br />
        Once you are ready, try playing quickfire to test your recall against
        the clock.
      </DialogContentText>
    </BaseDialog>
  );
};
