import { Button, CircularProgress, Grid, Skeleton } from "@mui/material"
import axios from "axios"
import { WebcamContainer } from "components/Video/WebcamContainer"
import { useState } from "react"
import { WordleGrid } from "./WordleGrid"

// export interface GamePanelProps {
//   // guesses: string[][]
// }

type gameState = 'Not Started' | 'Capturing' | 'Predicting';

export const GamePanel = () => {

  const [gameState, setGameState] = useState<gameState>('Not Started');

  const [previousGuesses, setPreviousGuesses] = useState<string[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>([])

  const [isRevealing, setIsRevealing] = useState(false)

  const [frameBatch, setFrameBatch] = useState<string[]>([]);

  const onFrameCapture = (frame: string) => {
    setFrameBatch(prevFrames => [...prevFrames.slice(prevFrames.length - 20), frame])
  }

  const handleTryGuess = () => {
    setIsRevealing(true)
    setTimeout(() => {
      setIsRevealing(false)
    }, 350 * 5)

    setPreviousGuesses(previousGuesses => [...previousGuesses, currentGuess])
    setCurrentGuess([])
  }

  const handlePredictionResponse = (prediction: string) => {
    setCurrentGuess(currentGuess => [...currentGuess, prediction.toUpperCase()])
  }

  const handleGameStart = () => {
    setGameState('Capturing')
  }

  const handleSubmitLetterFrames = (frameBatch: string[]) => {
    setGameState('Predicting')

    axios.post<{prediction: string}>(`${process.env.REACT_APP_BACKEND_API}/letter-prediction/frame-sequence`, {'frames': frameBatch})
         .then(response => handlePredictionResponse(response.data.prediction))
         .finally(() => {
          setGameState('Capturing')
         });
  }

  return (
    <Grid container alignItems="center"  direction="row" justifyContent="center">
    <Grid item xs={6}>
      { gameState === 'Not Started' && <Skeleton variant="rectangular" width={1280 / 2.5} height={720 / 2.5} /> }
      { gameState === 'Capturing' && <WebcamContainer onFrameCapture={onFrameCapture} fps={5} enableCapture={true}/> }
      { gameState === 'Predicting' && <CircularProgress/>}
    </Grid>
    <Grid item xs={6}>
      <div className="mx-auto flex w-full grow flex-col px-1 pt-2 pb-8 sm:px-6 md:max-w-7xl lg:px-8 short:pb-2 short:pt-2">
        <div className="flex grow flex-col justify-center pb-6 short:pb-2">
          <WordleGrid solution='apple' currentGuess={currentGuess} guesses={previousGuesses} isRevealing={isRevealing} numberOfAttempts={6} />
        </div>
      </div>
    </Grid>
    <Grid item xs={6}>
      <Button variant="contained" onClick={handleGameStart}>Start</Button>
      <Button variant="contained" onClick={() => handleSubmitLetterFrames(frameBatch)}>Submit Letter</Button>
      <Button variant="contained" onClick={handleTryGuess}>Try Guess</Button>
    </Grid>
  </Grid>

  )
}
