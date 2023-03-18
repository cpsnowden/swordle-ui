import { useRandomEmoji } from "features/games/quickfire/useRandomEmoji";

export const PositiveReaction = () => {
  const emoji = useRandomEmoji(true);
  return <div className="text-4xl">{emoji}</div>;
};

export const NegativeReaction = () => {
  const emoji = useRandomEmoji(false);
  return <div className="text-4xl">{emoji}</div>;
};
