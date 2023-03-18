import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
} from "@mui/material";
import { FC, useState } from "react";
import { usePreferences } from "./use-preferences";

export interface PreferencesDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreferencesDialog: FC<PreferencesDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const { savedPreferences, savePreferences } = usePreferences();
  const [unsavedPreferences, setUnsavedPreferences] =
    useState(savedPreferences);

  const handleSave = () => {
    savePreferences(unsavedPreferences);
    onClose();
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={unsavedPreferences.mirrorWebcam}
                  onChange={(_, mirrorWebcam) =>
                    setUnsavedPreferences({
                      ...unsavedPreferences,
                      mirrorWebcam,
                    })
                  }
                />
              }
              label="Mirror Webcam"
            />
          </FormGroup>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
