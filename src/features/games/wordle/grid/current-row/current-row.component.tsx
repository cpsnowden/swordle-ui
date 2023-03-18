import { Cell } from "../cell";
import { mapRange } from "utils/functional";
import { FC } from "react";

export interface CurrentRowProps {
  solution: string;
  guess: string[];
  currentLetter?: string;
}

export const CurrentRow: FC<CurrentRowProps> = ({
  guess,
  solution,
  currentLetter,
}) => {
  const emptyCells = mapRange(solution.length - 1 - guess.length, (i) => (
    <Cell key={i} />
  ));
  return (
    <div className="flex justify-center mb-1">
      {guess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {guess.length < solution.length && (
        <Cell key="current" value={currentLetter} current />
      )}
      {emptyCells}
    </div>
  );
};
