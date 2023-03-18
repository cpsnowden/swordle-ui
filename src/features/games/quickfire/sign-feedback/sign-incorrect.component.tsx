import { Stack } from "@mui/material";
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
      <div className="text-4xl">{emoji}</div>
      <div className="text-2xl">
        Incorrect {targetLetter} != {predictedLetter}
      </div>
      <div className="text-2xl">Try again in {remainingTime}</div>
    </Stack>
  );
};
