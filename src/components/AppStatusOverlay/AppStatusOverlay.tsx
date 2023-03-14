import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { useApiPing } from "hooks/useApiPing";
import { API_POLL_INTERVAL_MS } from "services/params";
import { Stack } from "@mui/system";

export const AppStatusOverlay = () => {
  const { pingState } = useApiPing(API_POLL_INTERVAL_MS);
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={pingState !== "ok"}
    >
      <Stack alignItems="center" spacing={2}>
        <CircularProgress color="inherit" />
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontFamily: "monospace",
          }}
        >
          {pingState === "error" ? "Reconnecting..." : "Connecting..."}
        </Typography>
      </Stack>
    </Backdrop>
  );
};
