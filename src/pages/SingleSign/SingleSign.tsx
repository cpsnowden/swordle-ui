import { Alert, Box, Button, Grid, Snackbar, Typography } from "@mui/material"
import { useCallback, useRef, useState } from "react";
import { CountdownCircleTimer, TimeProps } from "react-countdown-circle-timer";
import Webcam from "react-webcam";
import { LetterPrediction, predict_letter } from "services/api";
import { videoConstraints } from "services/params";
import './SingleSign.css'


export type GameStatus =
  | "Not Started"
  | "Letter Countdown"
  | "Predicting"
  | "User Check";

// const countDownSettings = {
//   countStart: 3,
//   countStop: 0,
//   intervalMs: 1000
// }

interface PredictionPanelProps {
  children?: React.ReactNode
}

interface ErrorAlertProps {
  error: string | null,
  onClose: () => void,
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onClose }) => (
  <Snackbar open={!!error} autoHideDuration={5000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
    <Alert severity="error" sx={{ width: '100%' }}>
      {error}
    </Alert>
  </Snackbar>
);

const PredictionPanel: React.FC<PredictionPanelProps> = ({ children }) => (
  <Typography
    variant="h2"
    align="center"
    sx={{
      fontFamily: 'monospace',
      fontWeight: 400,
    }}
  >
    {children}
  </Typography>
)

export const SingleSign = () => {
  const [countDownKey, setCountdownKey] = useState(0);
  const resetCountDown = () => setCountdownKey(prev => prev + 1);

  const [gameState, setGameState] = useState<GameStatus>('Not Started');
  const [prediction, setCurrentPrediction] = useState<string | null>();

  // const [img, setImg] = useState<string | null>(null);
  const videoRef = useRef<Webcam | null>(null)

  const [error, setError] = useState<string | null>(null);

  const startCaptureCountdown = () => {
    // setImg(null)
    resetCountDown()
    setGameState('Letter Countdown')
  }

  const submitPrediction = async (img: string) => {
    let prediction: LetterPrediction;
    try {
      prediction = await predict_letter(img);
    } catch (predictionError: any) {
      setError("Something has gone wrong, try again...")
      setCurrentPrediction(null)
      setGameState('User Check')
      return
    }
    if (prediction.predictionStatus === 'success') {
      setCurrentPrediction(prediction.prediction.toUpperCase())
      setGameState('User Check')
    } else if (prediction.predictionStatus === 'no_hand_detected') {
      setError('No hand detected, try again...')
      setGameState('User Check')
      setCurrentPrediction(null)
    } else {
      setError("Something has gone wrong, try again...")
    }
  }

  const submitPrediction2 = useCallback(() => {
    const src = videoRef.current?.getScreenshot() || null;
    // setImg(src)
    if (src) {
      setGameState('Predicting')
      submitPrediction(src)
    } else {
      console.log('No image captured')
    }
  }, [videoRef])

  const countDownChild: (props: TimeProps) => React.ReactNode = gameState === 'Letter Countdown' ?
    ({ remainingTime }) => (
      <div className="timer">
        <div className="timer-text">Taking photo in</div>
        <div className="timer-value">{remainingTime}</div>
      </div>
    ) :
    () => (
      <PredictionPanel>
        {prediction}
      </PredictionPanel>
    )

  return (
    <div className="video-container">
      <ErrorAlert error={error} onClose={() => setError(null)} />
      <Grid container
        alignItems="center"
        direction="row"
        justifyContent="center"
        columns={{ xs: 6, md: 12 }}
        spacing={2}>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <CountdownCircleTimer
              key={countDownKey}
              isPlaying={gameState === 'Letter Countdown'}
              duration={3}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[3, 2, 1, 0]}
              onComplete={submitPrediction2}
            >
              {countDownChild}
            </CountdownCircleTimer>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Webcam audio={false} videoConstraints={videoConstraints} ref={videoRef} />
        </Grid>
        <Grid item xs={6}>
          <Box textAlign='center'>
            <Button variant="contained" onClick={startCaptureCountdown}
              disabled={gameState === 'Predicting' || gameState === 'Letter Countdown'}
              size="large">
              {gameState === 'Not Started' && 'Start'}
              {gameState === 'User Check' && 'Next Letter'}
              {gameState === 'Predicting' && 'Predicting...'}
              {gameState === 'Letter Countdown' && `Wait for it...`}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}
