import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { usePing } from "./use-ping";
import { Stack } from "@mui/system";
import { FC } from "react";
import { API_PING_INTERVAL_MS } from "config";

export const AppStatusOverlay: FC<{}> = () => {
  const { pingState } = usePing(API_PING_INTERVAL_MS);
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
