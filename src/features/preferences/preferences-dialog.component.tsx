import { FormControlLabel, FormGroup, Stack, Switch } from "@mui/material";
import { BaseDialog } from "components/base-dialog";
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
    <BaseDialog
      title="Settings"
      closeText="Save"
      isOpen={isOpen}
      onClose={handleSave}
    >
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
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={unsavedPreferences.enableDarkMode}
                onChange={(_, darkMode) =>
                  setUnsavedPreferences({
                    ...unsavedPreferences,
                    enableDarkMode: darkMode,
                  })
                }
              />
            }
            label="Enable Dark Mode"
          />
        </FormGroup>
      </Stack>
    </BaseDialog>
  );
};
