import { Stack } from "@mui/material";
import { useRandomChoice } from "hooks/use-random-choice";
import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const positiveReactionEmoji = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "🤣",
  "😂",
  "🙂",
  "🙃",
  "🫠",
  "😉",
  "😊",
  "😇",
];

export interface SignCorrectProps {
  remainingTime: number;
}

export const SignCorrect: React.FC<SignCorrectProps> = ({ remainingTime }) => {
  const emoji = useRandomChoice(positiveReactionEmoji);

  const [shouldFireConfetti] = useState(() => {
    return Math.random() > 0.5;
  });
  return (
    <Stack spacing={0} alignItems="center">
      return <div className="text-4xl">{emoji}</div>;
      {shouldFireConfetti && <ConfettiExplosion />}
      <div className="text-2xl">Correct</div>
      <div className="text-2xl">Next letter in {remainingTime}</div>
    </Stack>
  );
};
