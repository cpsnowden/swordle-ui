import { CircularProgress } from '@mui/material'
import { GameStatus } from 'services/statuses'
import { Cell } from 'components/wordle/Cell/Cell'
import VideocamIcon from '@mui/icons-material/Videocam';
import { red } from '@mui/material/colors';

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
        case 'Capturing':
          return (<Cell key={i} value={<VideocamIcon sx={{ color: red[500] }}/>}/>)
        case 'Predicting':
          return (<Cell key={i} value={<CircularProgress />}/>)
      }
    }
    return (<Cell key={i}/>)
  })
  return (
    <div className="flex justify-center mb-1">
      {guess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells}
    </div>
  )
}
