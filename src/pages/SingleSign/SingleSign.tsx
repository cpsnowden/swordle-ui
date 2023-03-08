import { Box, Button, Grid } from "@mui/material"
import WebcamContainer from "components/webcam/WebcamContainer"
import { useState } from "react";
import { LetterPrediction, predict_letter } from "services/api";
import { GameStatus } from "services/statuses";

export const SingleSign = () => {

  const [gameState, setGameState] = useState<GameStatus>('Not Started');
  const [frameBatch, setFrameBatch] = useState<string[]>([]);
  const [prediction, setCurrentPrediction] = useState<string | null>();

  const handleFrameCapture = (frame: string) => {
    setFrameBatch(prevFrames => [...prevFrames.slice(prevFrames.length - 20 - 1), frame])
  }

  const handleStartRecording = () => {
    setFrameBatch([]);
    setGameState('Capturing')
  }

  const handlePredictionResponse = (prediction: LetterPrediction) => {
    setCurrentPrediction(prediction.prediction.toUpperCase())
    setGameState('Not Started')
  }

  const handleSubmitLetterFrames = (frameBatch: string[]) => {
    setGameState('Predicting')
    predict_letter(frameBatch, handlePredictionResponse)
  }

  return (
  <Grid container
    alignItems="center"
    direction="row"
    justifyContent="center"
    columns={{xs: 6, md:12}}
    spacing={2}>
    <Grid item xs={6}>
      Prediction {prediction}
    </Grid>
    <Grid item xs={6}>
      <WebcamContainer onFrameCapture={handleFrameCapture} fps={5} enableCapture={gameState==='Capturing'}/>
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
      </Button>}
    </Box>
    </Grid>
  </Grid>
  );
}
