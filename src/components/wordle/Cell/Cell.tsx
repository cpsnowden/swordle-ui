import classnames from 'classnames'
import { CharStatus } from 'services/wordle'
import './Cell.css'

export interface CellProps {
  value?: string | React.ReactNode
  status?: CharStatus
  isRevealing?: boolean
  isCompleted?: boolean
  position?: number
}

export const Cell: React.FC<CellProps> = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
}) => {
  const isFilled = value && !isCompleted
  const shouldReveal = isRevealing && isCompleted
  const animationDelay = `${position * 350}ms`

  const classes = classnames(
    // Small Screen
    'short:w-10 short:h-10 short:text-2xl',
    // Default
    'w-14 h-14 text-4xl',
    'border-solid border-2 flex items-center justify-center mx-0.5 font-bold rounded text-white',
    {
      'border-slate-600': !status,
      'border-slate-100': value && !status,
      'absent shadowed bg-slate-700 text-white border-slate-700': status === 'absent',
      'correct shadowed bg-green-500 text-white border-green-500': status === 'correct',
      'present shadowed bg-yellow-500 text-white border-yellow-500': status === 'present',
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal,
    }
  )

  return (
    <div className={classes} style={{ animationDelay }}>
      <div className="letter-container" style={{ animationDelay }}>
        {value}
      </div>
    </div>
  )
}
