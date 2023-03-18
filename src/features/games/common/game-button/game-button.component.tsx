import { Fab, FabProps } from "@mui/material";
import { FC } from "react";

export type GameButtonProps = FabProps;

export const GameButton: FC<GameButtonProps> = ({ children, ...rest }) => (
  <Fab variant="extended" size="large" sx={{ minWidth: 150 }} {...rest}>
    {children}
  </Fab>
);
