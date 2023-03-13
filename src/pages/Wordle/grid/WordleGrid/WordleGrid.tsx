import { CompletedRow } from 'pages/Wordle/grid/CompletedRow/CompletedRow';
import { CurrentRow } from 'pages/Wordle/grid/CurrentRow/CurrentRow';
import { EmptyRow } from 'pages/Wordle/grid/EmptyRow/EmptyRow';
import { GameStatus } from 'services/statuses';

export interface WordleGridProps {
  solution: string
  guesses: string[][]
  currentGuess: string[]
  numberOfAttempts: number
  isRevealing?: boolean
  gameStatus: GameStatus
}

export const WordleGrid: React.FC<WordleGridProps> = ({
  solution,
  guesses,
  currentGuess,
  numberOfAttempts,
  isRevealing,
  gameStatus
}) => {
  const nEmptyRows = numberOfAttempts - guesses.length - 1;
  const emptyRows = nEmptyRows > 0 ? Array(nEmptyRows).fill(0) : [];
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
        <CurrentRow guess={currentGuess} solution={solution} gameStatus={gameStatus} />
      )}
      {emptyRows.map((_, i) => (
        <EmptyRow key={i} solutionLength={solution.length} />
      ))}
    </>
  )
}
