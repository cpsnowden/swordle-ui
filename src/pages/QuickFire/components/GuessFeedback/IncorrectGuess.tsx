import { Stack } from "@mui/material";
import { NegativeReaction } from "./Reaction";

export interface IncorrectGuessProps {
  target: string;
  prediction: string;
  remainingTime: number;
}

export const IncorrectGuess: React.FC<IncorrectGuessProps> = ({
  target,
  prediction,
  remainingTime,
}) => {
  return (
    <Stack spacing={0} alignItems="center">
      <NegativeReaction />
      <div className="text-2xl">
        Incorrect {target} != {prediction}
      </div>
      <div className="text-2xl">Try again in {remainingTime}</div>
    </Stack>
  );
};
