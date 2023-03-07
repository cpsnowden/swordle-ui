import { CircularProgress } from '@mui/material'
import { GameStatus } from 'services/statuses'
import { Cell } from './Cell'
import VideocamIcon from '@mui/icons-material/Videocam';
import { red } from '@mui/material/colors';


interface CurrentRowProps {
  guess: string[]
  className: string
  solutionLength: number
  gameStatus: GameStatus
}

export const CurrentRow: React.FC<CurrentRowProps> = ({ guess, solutionLength, className, gameStatus }) => {

  const emptyCells = Array(solutionLength - guess.length).fill(0).map((_, i) => {
    if (i == 0) {
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
    <div className={`flex justify-center mb-1 ${className}`}>
      {guess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells}
    </div>
  )
}
