import { CompletedRow } from 'components/Wordle/grid/CompletedRow';

export interface WordleGridProps {
  // solution: string
  guesses: string[][]
  // currentGuess: string
  isRevealing?: boolean
  // currentRowClassName: string
}

export const WordleGrid: React.FC<WordleGridProps> = ({
  guesses,
  isRevealing,
}) => {
  return (
    <>
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          guess={guess}
          isRevealing={isRevealing && guesses.length - 1 === i}
        />
      ))}
    </>
  )
}
