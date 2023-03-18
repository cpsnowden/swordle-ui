import { Grid } from "@mui/material";
import { FC, ReactNode } from "react";

export interface GameLayoutProps {
  feedbackPanel: ReactNode;
  webcamPanel: ReactNode;
  buttonPanel: ReactNode;
}

export const GameLayout: FC<GameLayoutProps> = ({
  feedbackPanel,
  webcamPanel,
  buttonPanel,
}) => (
  <Grid
    container
    alignItems="center"
    justifyContent="center"
    columns={{ xs: 6, md: 12 }}
    spacing={2}
    minHeight="90vh"
  >
    <Grid item xs={6}>
      {feedbackPanel}
    </Grid>
    <Grid item xs={6}>
      {webcamPanel}
    </Grid>
    <Grid item xs={6}>
      {buttonPanel}
    </Grid>
  </Grid>
);
