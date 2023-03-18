import { Stack, Typography } from "@mui/material";
import { useRandomChoice } from "hooks/use-random-choice";

const neutralReactionEmoji = [
  "🤐",
  "🤨",
  "😐",
  "😑",
  "😶",
  "🫥",
  "😶‍🌫️",
  "😏",
  "😒",
  "🙄",
  "😬",
  "😮‍💨",
  "🤥",
];

export interface SignIncorrectProps {
  targetLetter: string;
  predictedLetter: string;
  remainingTime: number;
}

export const SignIncorrect: React.FC<SignIncorrectProps> = ({
  targetLetter,
  predictedLetter,
  remainingTime,
}) => {
  const emoji = useRandomChoice(neutralReactionEmoji);
  return (
    <Stack spacing={0} alignItems="center">
      <Typography
        variant="h6"
        align="center"
        sx={{
          fontFamily: "monospace",
        }}
      >
        Incorrect {emoji}
        <br />
        {targetLetter} != {predictedLetter}
        <br />
        Next letter in {remainingTime}
      </Typography>
    </Stack>
  );
};
