import { useRandomChoice } from "../../../hooks/use-random-choice";

const smilingEmojis = [
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
const unhappyEmojis = [
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

export const useRandomEmoji = (positive: boolean): string => {
  return useRandomChoice(positive ? smilingEmojis : unhappyEmojis);
};
