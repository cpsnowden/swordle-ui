import { CircularProgress } from '@mui/material'
import { GameStatus } from 'services/statuses'
import { Cell } from 'components/wordle/Cell/Cell'

export interface CurrentRowProps {
  solution: string,
  guess: string[]
  gameStatus: GameStatus
}

export const CurrentRow: React.FC<CurrentRowProps> = ({ guess, solution, gameStatus }) => {
  const emptyCells = Array(solution.length - guess.length).fill(0).map((_, i) => {
    // The current working cell

    if (i === 0) {
      switch (gameStatus) {
        case 'Predicting':
          return (<Cell key={i} value={<CircularProgress />} />)
        default:
          return (<Cell key={i} />)
      }
    }
    return (<Cell key={i} />)
  })
  console.log(emptyCells)
  return (
    <div className="flex justify-center mb-1">
      {guess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells}
    </div>
  )
}
