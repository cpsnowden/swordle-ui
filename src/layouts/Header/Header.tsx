import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useApiPing, ApiPingState } from "hooks/useApiPing";

export interface HeaderProps {}

export const apiPingIcon = (state: ApiPingState) => {
  switch (state) {
    case "ok":
      return <CheckCircleOutlineIcon color="success" />;
    case "waiting":
      return <WarningAmberIcon color="warning" />;
    default:
      return <ErrorOutlineIcon color="error" />;
  }
};

export const Header: React.FC<HeaderProps> = () => {
  const { pingState } = useApiPing(1000);
  const pingStatusIcon = apiPingIcon(pingState);
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          {pingStatusIcon}
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
