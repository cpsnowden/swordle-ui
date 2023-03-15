import { Stack } from "@mui/material";
import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { PositiveReaction } from "./Reaction";

export interface CorrectGuessProps {
  remainingTime: number;
}

export const CorrectGuess: React.FC<CorrectGuessProps> = ({
  remainingTime,
}) => {
  const [shouldFireConfetti] = useState(() => {
    return Math.random() > 0.5;
  });
  return (
    <Stack spacing={0} alignItems="center">
      <PositiveReaction />
      {shouldFireConfetti && <ConfettiExplosion />}
      <div className="text-2xl">Correct</div>
      <div className="text-2xl">Next letter in {remainingTime}</div>
    </Stack>
  );
};
