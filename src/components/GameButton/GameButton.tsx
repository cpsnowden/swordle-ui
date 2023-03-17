import { Fab, FabProps } from "@mui/material";

export type GameButtonProps = FabProps;

export const GameButton: React.FC<GameButtonProps> = ({
  children,
  ...rest
}) => (
  <Fab variant="extended" size="large" sx={{ mr: 2, minWidth: 150 }} {...rest}>
    {children}
  </Fab>
);
