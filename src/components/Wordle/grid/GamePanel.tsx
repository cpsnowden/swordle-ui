import { Button, Grid } from "@mui/material"
import axios from "axios"
import { WebcamContainer } from "components/Video/WebcamContainer"
import { useState } from "react"
import { GameStatus } from "services/statuses"
import { WordleGrid } from "components/Wordle/grid/WordleGrid"

const solution = 'apple';

export const GamePanel = () => {

  const [gameState, setGameState] = useState<GameStatus>('Not Started');

  const [previousGuesses, setPreviousGuesses] = useState<string[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>([])

  const [frameBatch, setFrameBatch] = useState<string[]>([]);

  const onFrameCapture = (frame: string) => {
    setFrameBatch(prevFrames => [...prevFrames.slice(prevFrames.length - 20), frame])
  }

  const handleTryGuess = () => {
    setGameState('Validating')
    setTimeout(() => {
      setGameState('Not Started')
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
      <WebcamContainer onFrameCapture={onFrameCapture} fps={5} enableCapture={gameState==='Capturing'}/>
    </Grid>
    <Grid item xs={6}>
      <div className="mx-auto flex w-full grow flex-col px-1 pt-2 pb-8 sm:px-6 md:max-w-7xl lg:px-8 short:pb-2 short:pt-2">
        <div className="flex grow flex-col justify-center pb-6 short:pb-2">
          <WordleGrid solution={solution} currentGuess={currentGuess} guesses={previousGuesses} isRevealing={gameState=== 'Validating'} numberOfAttempts={6} gameStatus={gameState}/>
        </div>
      </div>
    </Grid>
    <Grid item xs={6}>
      {gameState === 'Not Started' && <Button variant="contained" onClick={handleGameStart}>Start Row</Button>}
      {gameState === 'Capturing' && <Button variant="contained" onClick={() => handleSubmitLetterFrames(frameBatch)} disabled={currentGuess.length >= solution.length}>Submit Letter</Button>}
      {currentGuess.length === solution.length && <Button variant="contained" onClick={handleTryGuess} >Try Guess</Button>}
    </Grid>
  </Grid>

  )
}
