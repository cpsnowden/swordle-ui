import { createContext, FC, ReactNode, useCallback, useState } from "react";

type Alert = {
  message: string;
};

type AlertContextValue = {
  currentAlert?: Alert;
  showError: (message: string) => void;
  dismissAlert: () => void;
};

export const AlertContext = createContext<AlertContextValue>({
  showError: () => null,
  dismissAlert: () => null,
});
AlertContext.displayName = "AlertContext";

interface AlertProviderProps {
  children?: ReactNode;
}

export const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
  const [currentAlert, setCurrentAlert] = useState<Alert>();

  const showError = useCallback(
    (message: string) => {
      setCurrentAlert({ message });
    },
    [setCurrentAlert]
  );

  const dismissAlert = useCallback(
    () => setCurrentAlert(undefined),
    [setCurrentAlert]
  );

  return (
    <AlertContext.Provider
      value={{
        showError,
        dismissAlert,
        currentAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
