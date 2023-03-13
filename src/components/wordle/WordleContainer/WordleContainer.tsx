import { Alert, Box, Button, Dialog, DialogTitle, Grid, Snackbar } from "@mui/material"
import { useCallback, useEffect, useRef, useState } from "react"
import { WordleGrid } from "components/wordle/WordleGrid/WordleGrid"
import { LetterPrediction, predict_letter } from "services/api"
import Webcam from "react-webcam"
import { videoConstraints } from "services/params"
import { GameStatus } from "services/statuses"
import { useCountdown } from "usehooks-ts"
import ConfettiExplosion from "react-confetti-explosion"

export interface WordlePanelProps {
  solution?: string
}

interface ErrorAlertProps {
  error: string | null,
  onClose: () => void,
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onClose }) => (
  <Snackbar open={!!error} autoHideDuration={5000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
    <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
      {error}
    </Alert>
  </Snackbar>
);


type FinishState = 'WIN' | 'LOSE'

export const WordlePanel: React.FC<WordlePanelProps> = ({
  solution = 'APPLE'
}) => {

  const [finishState, setFinishState] = useState<FinishState>();

  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 1,
    countStop: 0,
    intervalMs: 1000,
  })

  const [gameState, setGameState] = useState<GameStatus>('User Check');
  const [previousGuesses, setPreviousGuesses] = useState<string[][]>([
    ["A", "A", "A", "A", "A"],
    ["A", "A", "A", "A", "A"],
    ["A", "A", "A", "A", "A"],
    ["A", "A", "A", "A", "A"],
    ["A", "A", "A", "A", "A"],
  ]);
  const [currentGuess, setCurrentGuess] = useState<string[]>(["A", "P", "P", "L"])

  // const [img, setImg] = useState<string | null>(null);
  const videoRef = useRef<Webcam | null>(null)

  const [error, setError] = useState<string | null>(null);

  const submitToPredictionApi = async (img: string) => {
    let prediction: LetterPrediction;
    try {
      prediction = await predict_letter(img);
    } catch (predictionError: any) {
      setError("Something has gone wrong, try again...")
      setGameState('User Check')
      return
    }
    console.log(prediction)
    if (prediction.predictionStatus === 'success') {
      setCurrentGuess(currentGuess => [...currentGuess, prediction.prediction.toUpperCase()])
      setGameState('User Check')
    } else if (prediction.predictionStatus === 'no_hand_detected') {
      setError('No hand detected, try again...')
      setGameState('User Check')
    } else {
      setError("Something has gone wrong, try again...")
    }
  }

  const startCaptureCountdown = () => {
    // setImg(null)
    resetCountdown()
    startCountdown()
    setGameState('Letter Countdown')
  }

  const submitPrediction = useCallback(() => {
    const src = videoRef.current?.getScreenshot() || null;
    // setImg(src)
    if (src) {
      setGameState('Predicting')
      submitToPredictionApi(src)
    } else {
      console.log('No image captured')
    }
  }, [videoRef])

  const validateGuess = () => {
    setGameState('Validating')
    setTimeout(() => {
      setGameState('Not Started')
    }, 350 * 5)
    setPreviousGuesses(previousGuesses => [...previousGuesses, currentGuess])

    // This might have an issue as
    console.log('Previous guesses', previousGuesses)
    if (previousGuesses.length === 6 - 1) {
      console.log("Checking if you've won")
      checkIfWon()
    }
    setCurrentGuess([])
  }

  const checkIfWon = () => {
    console.log(currentGuess)
    console.log(solution.split(""))
    if (currentGuess.join("") === solution) {
      setFinishState('WIN')
    } else {
      setFinishState('LOSE')
    }
  }

  useEffect(() => {
    if (count === 0) {
      console.log("Submitting prediction")
      submitPrediction()
    }
  }, [count, submitPrediction])

  const handleRetryLetter = () => {
    console.log("I should retry the letter")
    setCurrentGuess(currentGuess => currentGuess.slice(0, currentGuess.length - 1))
    startCaptureCountdown()
  }

  return (
    <>
      <ErrorAlert error={error} onClose={() => setError(null)} />
      <Dialog
        open={!!finishState}
      >
        <DialogTitle id="alert-dialog-title">
          {finishState === 'LOSE' ? `You have lost, the solution was ${solution}` : "Horray, you have won"}
        </DialogTitle>
        <ConfettiExplosion />
      </Dialog>
      <Grid container
        alignItems="center"
        direction="row"
        justifyContent="center"
        columns={{ xs: 6, md: 12 }}
        spacing={2}
      >
        <Grid item xs={6}>
          <WordleGrid solution={solution} currentGuess={currentGuess} guesses={previousGuesses} isRevealing={gameState === 'Validating'} numberOfAttempts={6} gameStatus={gameState} />
        </Grid>
        <Grid item xs={6}>
          <Webcam audio={false} videoConstraints={videoConstraints} ref={videoRef} />
        </Grid>
        <Grid item xs={6}>
          <Box textAlign='center'>
            {
              gameState === 'User Check' &&
              <Button variant="contained" onClick={handleRetryLetter} size="large">
                Retry
              </Button>
            }
            {
              currentGuess.length < solution.length &&
              <Button variant="contained" onClick={startCaptureCountdown}
                disabled={gameState === 'Predicting' || gameState === 'Letter Countdown'}
                size="large">
                {gameState === 'Not Started' && 'Start Row'}
                {gameState === 'User Check' && 'Next Letter'}
                {gameState === 'Predicting' && 'Predicting...'}
                {gameState === 'Letter Countdown' && `Taking screenshot in ${count}`}
              </Button>
            }
            {
              currentGuess.length === solution.length &&
              <Button variant="contained" onClick={validateGuess} size="large">
                Validate
              </Button>
            }
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
