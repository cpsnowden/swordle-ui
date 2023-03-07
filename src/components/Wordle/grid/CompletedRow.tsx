import { Cell } from 'components/Wordle/grid/Cell'

interface CompletedRowProps {
  guess: string[]
  isRevealing?: boolean
}

export const CompletedRow: React.FC<CompletedRowProps> = ({ guess, isRevealing }) => {
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
          />
        ))}
      </div>
    </>
  )
}
