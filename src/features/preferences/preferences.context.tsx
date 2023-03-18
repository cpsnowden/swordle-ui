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

export const PreferenceContext = createContext<PreferencesContext>({
  savedPreferences: defaultPreferences,
  savePreferences: () => {},
});

export const PreferenceContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [savedPreferences, savePreferences] = useLocalStorage<Preferences>(
    "swordle-preferences",
    defaultPreferences
  );

  return (
    <PreferenceContext.Provider value={{ savedPreferences, savePreferences }}>
      {children}
    </PreferenceContext.Provider>
  );
};
