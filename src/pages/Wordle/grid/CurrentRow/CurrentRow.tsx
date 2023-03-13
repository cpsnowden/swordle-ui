import Cell from "pages/Wordle/grid/Cell";
import { mapRange } from "services/utils";

export interface CurrentRowProps {
  solution: string;
  guess: string[];
  currentLetter?: string;
}

export const CurrentRow: React.FC<CurrentRowProps> = ({
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
      <Cell key="current" value={currentLetter} current />
      {emptyCells}
    </div>
  );
};
