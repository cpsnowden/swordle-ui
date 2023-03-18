import { useContext } from "react";
import { PreferencesContext, PreferenceContext } from "./preferences.context";

export const usePreferences = (): PreferencesContext => {
  const { savedPreferences, savePreferences } = useContext(PreferenceContext);
  return { savedPreferences, savePreferences };
};
