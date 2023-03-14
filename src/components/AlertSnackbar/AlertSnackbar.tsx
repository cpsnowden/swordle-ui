import { Alert, Snackbar } from "@mui/material";

export interface AlertSnackbarProps {
  error: string | null;
  onClose: () => void;
}

export const AlertSnackbar: React.FC<AlertSnackbarProps> = ({
  error,
  onClose,
}) => {
  return (
    <Snackbar
      open={!!error}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  );
};