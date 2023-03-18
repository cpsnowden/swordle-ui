import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import { usePreferences } from "features/preferences";
import { FC, PropsWithChildren, useMemo } from "react";

export const AppThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { savedPreferences } = usePreferences();
  const theme = useMemo(
    (): Theme =>
      createTheme({
        palette: {
          mode: savedPreferences.enableDarkMode ? "dark" : "light",
        },
      }),
    [savedPreferences.enableDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <div className={savedPreferences.enableDarkMode ? "dark" : ""}>
        {children}
      </div>
    </ThemeProvider>
  );
};
