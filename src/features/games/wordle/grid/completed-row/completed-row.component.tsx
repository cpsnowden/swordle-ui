import { Cell } from "../cell";
import { FC } from "react";
import { CharStatus } from "../../types";

// Taken from Reactle
export const calculateStatus = (
  solution: string,
  guess: string[]
): CharStatus[] => {
  const splitSolution = solution.split("");

  const solutionCharsTaken = splitSolution.map((_) => false);

  const statuses: CharStatus[] = Array.from(Array(guess.length));

  // handle all correct cases first
  guess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = "correct";
      solutionCharsTaken[i] = true;
      return;
    }
  });

  guess.forEach((letter, i) => {
    if (statuses[i]) return;

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = "absent";
      return;
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    );

    if (indexOfPresentChar > -1) {
      statuses[i] = "present";
      solutionCharsTaken[indexOfPresentChar] = true;
      return;
    } else {
      statuses[i] = "absent";
      return;
    }
  });
  return statuses;
};

export interface CompletedRowProps {
  solution: string;
  guess: string[];
  isRevealing?: boolean;
}

export const CompletedRow: FC<CompletedRowProps> = ({
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
