import Cell from "pages/Wordle/grid/Cell";
import { calculateStatus } from "services/wordle";

export interface CompletedRowProps {
  solution: string;
  guess: string[];
  isRevealing?: boolean;
}

export const CompletedRow: React.FC<CompletedRowProps> = ({
  solution,
  guess,
  isRevealing,
}) => {
  const statuses = calculateStatus(solution, guess);
  return (
    <div className="mb-1 flex justify-center">
      {guess.map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          position={i}
          isRevealing={isRevealing}
          isCompleted
          status={statuses[i]}
        />
      ))}
    </div>
  );
};
