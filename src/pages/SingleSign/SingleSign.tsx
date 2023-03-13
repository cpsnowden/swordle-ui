import { Alert, Box, Button, Grid, Paper, Snackbar, Typography } from "@mui/material"
import WebcamContainer from "components/webcam/WebcamContainer"
import { useState } from "react";
import { LetterPrediction, predict_letter } from "services/api";
import { GameStatus } from "services/statuses";

export const SingleSign = () => {

  const [error, setError] = useState<string | null>();
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

  const handleSubmitLetterFrames = async (frameBatch: string[]) => {
    setGameState('Predicting')
    try {
      const prediction = await predict_letter(frameBatch)
      setCurrentPrediction(prediction.prediction.toUpperCase())
    } catch (predictionError: any) {
      // https://github.com/axios/axios/issues/3612
      console.log(predictionError)
      if (predictionError.detail) {
        setError(predictionError.detail);
      } else {
        setError("Something has gone wrong")
      }
    }
    setGameState('Not Started')
  }

  return (
    <Grid container
      alignItems="center"
      direction="row"
      justifyContent="center"
      columns={{ xs: 6, md: 12 }}
      spacing={2}>
      <Snackbar open={!!error} autoHideDuration={2000} onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Grid item xs={6}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Paper elevation={3} sx={{ width: 128, height: 128 }}>
            <Typography
              variant="h1"
              align="center"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 600,
              }}
            >
              {prediction ? prediction : '?'}
            </Typography>
          </Paper>
        </Box>
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
