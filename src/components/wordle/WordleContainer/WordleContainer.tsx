import { Box, Button, Grid } from "@mui/material"
import { WebcamContainer } from "components/webcam/WebcamContainer/WebcamContainer"
import { useEffect, useState } from "react"
import { GameStatus } from "services/statuses"
import { WordleGrid } from "components/wordle/WordleGrid/WordleGrid"
import { LetterPrediction, predict_letter } from "services/api"

export interface GamePanelProps {
  solution?: string
  frameBufferSize?: number,
  fps?: number
}

export const WordlePanel: React.FC<GamePanelProps> = ({
    solution = 'APPLE',
    frameBufferSize = 20,
    fps = 5
}) => {

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
    if (currentGuess.length === solution.length ) {
      setGameState('Validating')
      setTimeout(() => {
        setGameState('Not Started')
      }, 350 * 5)

      setPreviousGuesses(previousGuesses => [...previousGuesses, currentGuess])
      setCurrentGuess([])

      if (currentGuess === solution.split(",")) {
       //You've won
      }
      //Handle you've lost
    }
  }, [currentGuess, solution])

  return (
    <Grid container
          alignItems="center"
          direction="row"
          justifyContent="center"
          columns={{xs: 6, md:12}}
          spacing={2}
    >
    <Grid item xs={6}>
      {/* TODO Sort out this Tailwind CSS */}
      <div className="mx-auto flex w-full grow flex-col px-1 md:max-w-7xl lg:px-8">
        <WordleGrid solution={solution} currentGuess={currentGuess} guesses={previousGuesses} isRevealing={gameState=== 'Validating'} numberOfAttempts={6} gameStatus={gameState}/>
      </div>
    </Grid>
    <Grid item xs={6}>
      <WebcamContainer onFrameCapture={handleFrameCapture} fps={fps} enableCapture={gameState==='Capturing'}/>
    </Grid>
    <Grid item xs={6}>
      <Box textAlign='center'>
        {gameState === 'Not Started' &&
        <Button variant="contained" onClick={handleStartRecording} size="large">
          Record
        </Button>}
        {gameState === 'Capturing' &&
        <Button variant="contained" onClick={() => handleSubmitLetterFrames(frameBatch)} size="large">
          Submit
        </Button>
        }
      </Box>
    </Grid>
  </Grid>

  )
}
