import { CompletedRow } from 'components/Wordle/grid/CompletedRow';
import { CurrentRow } from 'components/Wordle/grid/CurrentRow';
import { EmptyRow } from 'components/Wordle/grid/EmptyRow';

export interface WordleGridProps {
  solution: string
  guesses: string[][]
  currentGuess: string[]
  numberOfAttempts: number
  isRevealing?: boolean
}

export const WordleGrid: React.FC<WordleGridProps> = ({
  solution,
  guesses,
  currentGuess,
  numberOfAttempts,
  isRevealing
}) => {
  const emptyRows = Array(numberOfAttempts - guesses.length - 1).fill(0);
  return (
    <>
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          guess={guess}
          isRevealing={isRevealing && guesses.length - 1 === i}
        />
      ))}
      {guesses.length < 6 && (
        <CurrentRow guess={currentGuess} className={''} solutionLength={solution.length}/>
      )}
      {emptyRows.map((_, i) => (
        <EmptyRow key={i} solutionLength={solution.length}/>
      ))}
    </>
  )
}
