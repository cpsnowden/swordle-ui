import { Cell } from "features/games/wordle/grid/cell";
import { FC } from "react";
import { mapRange } from "utils/functional";

export interface EmptyRowProps {
  solutionLength: number;
}

export const EmptyRow: FC<EmptyRowProps> = ({ solutionLength }) => {
  return (
    <div className="mb-1 flex justify-center">
      {mapRange(solutionLength, (i) => (
        <Cell key={i} />
      ))}
    </div>
  );
};
