import { Box, Button, Grid, Paper, Typography } from "@mui/material"
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
    setCurrentPrediction(null);
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
      columns={{ xs: 6, md: 12 }}
      spacing={2}>
      <Grid item xs={6}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Paper elevation={3} sx={{ width: 128, height: 128 }}>
            <Typography
              variant="h1"
              sx={{
                textAlign: 'center',
                fontFamily: 'monospace',
                fontWeight: 600,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {prediction ? prediction : '?'}
            </Typography>

          </Paper>
        </Box>

        {/* </Box> */}
      </Grid>
      <Grid item xs={6}>
        <WebcamContainer onFrameCapture={handleFrameCapture} fps={5} enableCapture={gameState === 'Capturing'} />
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
