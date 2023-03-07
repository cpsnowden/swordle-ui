import { Cell } from 'components/wordle/Cell/Cell'

export interface EmptyRowProps {
  solutionLength: number
}

export const EmptyRow: React.FC<EmptyRowProps> = ({solutionLength}) => {
  const emptyCells = Array(solutionLength).fill(0);
  return (
    <div className="mb-1 flex justify-center">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
