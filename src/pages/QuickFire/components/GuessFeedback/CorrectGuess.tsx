import { Stack } from "@mui/material";
import { PositiveReaction } from "./Reaction";

export interface CorrectGuessProps {
  remainingTime: number;
}

export const CorrectGuess: React.FC<CorrectGuessProps> = ({
  remainingTime,
}) => {
  return (
    <Stack spacing={0} alignItems="center">
      <PositiveReaction />
      <div className="text-2xl">Correct</div>
      <div className="text-2xl">Next letter in {remainingTime}</div>
    </Stack>
  );
};
