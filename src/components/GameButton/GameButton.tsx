import { Fab, FabProps } from "@mui/material";

export type GameButtonProps = FabProps;

export const GameButton: React.FC<GameButtonProps> = ({
  children,
  ...rest
}) => (
  <Fab variant="extended" size="large" sx={{ minWidth: 150 }} {...rest}>
    {children}
  </Fab>
);
