import { Button, Grid } from "@mui/material"
import { WebcamContainer } from "components/webcam/WebcamContainer/WebcamContainer"
import { useEffect, useState } from "react"
import { GameStatus } from "services/statuses"
import { WordleGrid } from "components/wordle/WordleGrid/WordleGrid"
import { LetterPrediction, predict_letter } from "services/api"

export interface GamePanelProps {
  frameBufferSize?: number,
  solution?: string
}

export const GamePanel: React.FC<GamePanelProps> = ({frameBufferSize = 20, solution = 'APPLE'}) => {

  const [gameState, setGameState] = useState<GameStatus>('Not Started');
  const [previousGuesses, setPreviousGuesses] = useState<string[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>([])
  const [frameBatch, setFrameBatch] = useState<string[]>([]);

  const handleFrameCapture = (frame: string) => {
    setFrameBatch(prevFrames => [...prevFrames.slice(prevFrames.length - frameBufferSize - 1), frame])
  }

  const handleStartRecording = () => {
    setFrameBatch([]);
    setGameState('Capturing')
  }

  const handlePredictionResponse = (prediction: LetterPrediction) => {
    setCurrentGuess(currentGuess => [...currentGuess, prediction.prediction.toUpperCase()])
    setGameState('Not Started')
  }

  const handleSubmitLetterFrames = (frameBatch: string[]) => {
    setGameState('Predicting')
    predict_letter(frameBatch, handlePredictionResponse)
  }

  useEffect(() => {
    if (currentGuess.length === solution.length) {
      setGameState('Validating')
      setTimeout(() => {
        setGameState('Not Started')
      }, 350 * 5)
      setPreviousGuesses(previousGuesses => [...previousGuesses, currentGuess])
      setCurrentGuess([])
    }
  }, [currentGuess, solution])

  return (
    <Grid container alignItems="center"  direction="row" justifyContent="center">
    <Grid item xs={6}>
      <WebcamContainer onFrameCapture={handleFrameCapture} fps={5} enableCapture={gameState==='Capturing'}/>
    </Grid>
    <Grid item xs={6}>
      <div className="mx-auto flex w-full grow flex-col px-1 pt-2 pb-8 sm:px-6 md:max-w-7xl lg:px-8 short:pb-2 short:pt-2">
        <div className="flex grow flex-col justify-center pb-6 short:pb-2">
          <WordleGrid solution={solution} currentGuess={currentGuess} guesses={previousGuesses} isRevealing={gameState=== 'Validating'} numberOfAttempts={6} gameStatus={gameState}/>
        </div>
      </div>
    </Grid>
    <Grid item xs={6}>
      {gameState === 'Not Started' && <Button variant="contained" onClick={handleStartRecording}>Start Letter</Button>}
      {gameState === 'Capturing' && <Button variant="contained" onClick={() => handleSubmitLetterFrames(frameBatch)}>Submit</Button>}
    </Grid>
  </Grid>

  )
}
