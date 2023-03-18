import { useContext } from "react";
import {
  Preferences,
  PreferencesContext,
  UserPreferenceContext,
} from "./preferences.context";

export const useReadPreferences = (): Preferences => {
  const { savedPreferences } = useContext(UserPreferenceContext);
  return savedPreferences;
};

export const usePreferences = (): PreferencesContext => {
  const { savedPreferences, savePreferences } = useContext(
    UserPreferenceContext
  );
  return { savedPreferences, savePreferences };
};
