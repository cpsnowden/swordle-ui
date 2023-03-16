import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
} from "@mui/material";
import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

type Preferences = {
  mirrorWebcam: boolean;
};

export type PreferenceContext = {
  savedPreferences: Preferences;
  savePreferences: (preferences: Preferences) => void;
};

const defaultPreferences: Preferences = {
  mirrorWebcam: false,
};

const UserPreferenceContext = createContext<PreferenceContext>({
  savedPreferences: defaultPreferences,
  savePreferences: () => {},
});

export const UserPreferenceContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [savedPreferences, savePreferences] = useLocalStorage<Preferences>(
    "swordle-preferences",
    defaultPreferences
  );

  return (
    <UserPreferenceContext.Provider
      value={{ savedPreferences, savePreferences }}
    >
      {children}
    </UserPreferenceContext.Provider>
  );
};

export const useReadPreferences = (): Preferences => {
  const { savedPreferences } = useContext(UserPreferenceContext);
  return savedPreferences;
};

export const useReadWritePreferences = (): PreferenceContext => {
  const { savedPreferences, savePreferences } = useContext(
    UserPreferenceContext
  );
  return { savedPreferences, savePreferences };
};

export interface PreferencesFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreferencesForm: React.FC<PreferencesFormProps> = ({
  isOpen,
  onClose,
}) => {
  const { savedPreferences, savePreferences } = useReadWritePreferences();
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
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Grid item>
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
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
