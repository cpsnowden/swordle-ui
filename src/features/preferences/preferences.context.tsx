import { createContext, useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";

export type Preferences = {
  mirrorWebcam: boolean;
  enableDarkMode: boolean;
};

export type PreferencesContext = {
  savedPreferences: Preferences;
  savePreferences: (preferences: Preferences) => void;
};

const defaultPreferences: Preferences = {
  mirrorWebcam: false,
  enableDarkMode: true,
};

export const PreferenceContext = createContext<PreferencesContext>({
  savedPreferences: defaultPreferences,
  savePreferences: () => {},
});
PreferenceContext.displayName = "PreferenceContext";

export const PreferencesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [savedPreferences, savePreferences] = useLocalStorage<Preferences>(
    "swordle-preferences",
    defaultPreferences
  );

  const mergedPreferences: Preferences = useMemo(() =>
    ({ ...defaultPreferences, ...savedPreferences })
  , [savedPreferences]);

  return (
    <PreferenceContext.Provider value={{ savedPreferences: mergedPreferences, savePreferences }}>
      {children}
    </PreferenceContext.Provider>
  );
};
