import { CompletedRow } from "../completed-row";
import { CurrentRow } from "../current-row";
import { EmptyRow } from "../empty-row";
import { mapRange } from "utils/functional";

export interface WordleGridProps {
  solution: string;
  guesses: string[][];
  currentGuess: string[];
  currentLetter?: string;
  numberOfAttempts: number;
  isRevealing?: boolean;
}

export const SWordleGrid: React.FC<WordleGridProps> = ({
  solution,
  guesses,
  currentGuess,
  currentLetter,
  numberOfAttempts,
  isRevealing,
}) => {
  const emptyRows = mapRange(numberOfAttempts - guesses.length - 1, (i) => (
    <EmptyRow key={i} solutionLength={solution.length} />
  ));
  return (
    <>
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          solution={solution}
          guess={guess}
          isRevealing={isRevealing && guesses.length - 1 === i}
        />
      ))}
      {guesses.length < numberOfAttempts && (
        <CurrentRow
          guess={currentGuess}
          solution={solution}
          currentLetter={currentLetter}
        />
      )}
      {emptyRows}
    </>
  );
};
