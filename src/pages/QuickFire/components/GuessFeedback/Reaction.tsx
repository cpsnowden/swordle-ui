import { useRandomEmoji } from "hooks/useRandomEmoji";

export const PositiveReaction = () => {
  const emoji = useRandomEmoji(true);
  return (
    <>
      <div className="text-4xl">{emoji}</div>
      {/* <ConfettiExplosion /> */}
    </>
  );
};

export const NegativeReaction = () => {
  const emoji = useRandomEmoji(false);
  return <div className="text-4xl">{emoji}</div>;
};
