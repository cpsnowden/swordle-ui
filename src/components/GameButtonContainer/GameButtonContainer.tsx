import { Stack } from "@mui/material";
import { FC } from "react";

export interface GameButtonContainerProps {
  children: React.ReactNode;
}

export const GameButtonContainer: FC<GameButtonContainerProps> = ({
  children,
}) => (
  <Stack textAlign="center" justifyContent="center" direction="row" spacing={2}>
    {children}
  </Stack>
);
