import { Alert, Snackbar } from "@mui/material";
import { FC } from "react";
import { useAlert } from "./use-alert";

export const AlertContainer: FC<{}> = () => {
  const { currentAlert, dismissAlert } = useAlert();
  return (
    <Snackbar
      open={!!currentAlert}
      autoHideDuration={5000}
      onClose={dismissAlert}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
        {currentAlert?.message}
      </Alert>
    </Snackbar>
  );
};
