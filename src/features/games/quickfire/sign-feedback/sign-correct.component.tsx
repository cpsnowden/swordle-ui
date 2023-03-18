import { Stack, Typography } from "@mui/material";
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
      {shouldFireConfetti && <ConfettiExplosion />}
      <Typography
        variant="h6"
        align="center"
        sx={{
          fontFamily: "monospace",
        }}
      >
        Correct {emoji}
        <br />
        Next letter in {remainingTime}
      </Typography>
    </Stack>
  );
};
