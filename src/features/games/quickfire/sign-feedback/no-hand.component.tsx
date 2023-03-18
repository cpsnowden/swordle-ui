import { Stack } from "@mui/material";

export interface NoHandProps {
  remainingTime: number;
}

export const NoHand: React.FC<NoHandProps> = ({ remainingTime }) => {
  return (
    <Stack spacing={0} alignItems="center">
      <div className="text-4xl">🤔</div>
      <div className="text-2xl">No hand found...</div>
      <div className="text-2xl">Try again in {remainingTime}</div>
    </Stack>
  );
};
