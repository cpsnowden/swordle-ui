import { CompletedRow } from 'components/wordle/CompletedRow/CompletedRow';
import { CurrentRow } from 'components/wordle/CurrentRow/CurrentRow';
import { EmptyRow } from 'components/wordle/EmptyRow/EmptyRow';
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
  const emptyRows = Array(numberOfAttempts - guesses.length - 1).fill(0);
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
      {guesses.length < 6 && (
        <CurrentRow guess={currentGuess} solution={solution} gameStatus={gameStatus}/>
      )}
      {emptyRows.map((_, i) => (
        <EmptyRow key={i} solutionLength={solution.length}/>
      ))}
    </>
  )
}
