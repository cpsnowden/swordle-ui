import { useChoice } from "./useChoice";

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
  return  useChoice(positive ? smilingEmojis : unhappyEmojis)
}
