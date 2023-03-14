import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { ping } from "services/api";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export interface HeaderProps {}

type ApiPingState = "waiting" | "ok" | "error";

const useApiPing = () => {
  const [pingState, setPingState] = useState<ApiPingState>("waiting");

  const make_ping = (): void => {
    ping().then((result) => setPingState(result ? "ok" : "error"));
  };

  useEffect(() => {
    // Change this to only initiate next request after previous has returned
    const interval = setInterval(make_ping, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return {
    pingState,
  };
};

export const Header: React.FC<HeaderProps> = () => {
  const { pingState } = useApiPing();
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          {pingState === "ok" ? (
            <CheckCircleOutlineIcon color="success" />
          ) : pingState === "waiting" ? (
            <WarningAmberIcon color="warning" />
          ) : (
            <ErrorOutlineIcon color="error" />
          )}
          <Typography
            variant="h6"
            noWrap
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SWordle
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
