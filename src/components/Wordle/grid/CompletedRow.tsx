import { Cell } from 'components/Wordle/grid/Cell'
import { CharStatus } from 'services/statuses'

interface CompletedRowProps {
  solution: string
  guess: string[]
  isRevealing?: boolean
}

export const calculateStatus = (solution: string, guess: string[]): CharStatus[] => {
  // A correct letter turns green

  //A correct letter in the wrong place turns yellow

  // An incorrect letter turns gray

  return Array(solution.length).fill('present')
}

export const CompletedRow: React.FC<CompletedRowProps> = ({ solution, guess, isRevealing }) => {
  const statuses = calculateStatus(solution, guess);
  return (
    <>
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
    </>
  )
}
