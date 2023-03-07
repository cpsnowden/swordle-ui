import { Button } from "@mui/material"
import { useState } from "react"
import { WordleGrid } from "./WordleGrid"

export interface GamePanelProps {
  guesses: string[][]
}

export const GamePanel = ({guesses}: GamePanelProps) => {

  const [isRevealing, setIsRevealing] = useState(false)

  const onSubmit = () => {

    setIsRevealing(true)

    setTimeout(() => {
      setIsRevealing(false)
    }, 350 * 5)
  }

  return (
    <div className="mx-auto flex w-full grow flex-col px-1 pt-2 pb-8 sm:px-6 md:max-w-7xl lg:px-8 short:pb-2 short:pt-2">
      <div className="flex grow flex-col justify-center pb-6 short:pb-2">
        <WordleGrid guesses={guesses} isRevealing={isRevealing} />
      </div>
      <Button variant="contained" onClick={onSubmit}>Try</Button>
    </div>
  )
}
