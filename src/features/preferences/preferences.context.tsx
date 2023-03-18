import { createContext } from "react";
import { useLocalStorage } from "usehooks-ts";

export type Preferences = {
  mirrorWebcam: boolean;
};

export type PreferencesContext = {
  savedPreferences: Preferences;
  savePreferences: (preferences: Preferences) => void;
};

const defaultPreferences: Preferences = {
  mirrorWebcam: false,
};

export const UserPreferenceContext = createContext<PreferencesContext>({
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
