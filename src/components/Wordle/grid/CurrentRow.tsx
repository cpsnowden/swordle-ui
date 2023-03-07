import { Cell } from './Cell'

interface CurrentRowProps {
  guess: string[]
  className: string
  solutionLength: number
}

export const CurrentRow: React.FC<CurrentRowProps> = ({ guess, solutionLength, className }) => {
  const emptyCells = Array(solutionLength - guess.length).fill(0);
  return (
    <div className={`flex justify-center mb-1 ${className}`}>
      {guess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
