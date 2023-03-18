import { useRandomChoice } from "./useRandomChoice";

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
  return  useRandomChoice(positive ? smilingEmojis : unhappyEmojis)
}
