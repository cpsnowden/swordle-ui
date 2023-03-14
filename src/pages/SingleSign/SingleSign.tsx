import { Box, Button, Grid, Typography } from "@mui/material";
import AlertSnackbar from "components/AlertSnackbar";
import WebcamContainer from "components/WebcamContainer";
import { useRef, useState } from "react";
import { CountdownCircleTimer, TimeProps } from "react-countdown-circle-timer";
import Webcam from "react-webcam";
import { LetterPrediction, predict_letter } from "services/api";
import "./SingleSign.css";

type GameStatus =
  | "Not Started"
  | "Letter Countdown"
  | "Predicting"
  | "User Check";

interface PredictionPanelProps {
  children?: React.ReactNode;
}

const PredictionPanel: React.FC<PredictionPanelProps> = ({ children }) => (
  <Typography
    variant="h2"
    align="center"
    sx={{
      fontFamily: "monospace",
      fontWeight: 400,
    }}
  >
    {children}
  </Typography>
);

export const SingleSign = () => {
  const [countDownKey, setCountdownKey] = useState(0);
  const resetCountDown = () => setCountdownKey((prev) => prev + 1);

  const [gameState, setGameState] = useState<GameStatus>("Not Started");
  const [prediction, setCurrentPrediction] = useState<string | null>();

  const videoRef = useRef<Webcam | null>(null);

  const [error, setError] = useState<string | null>(null);

  const startCaptureCountdown = () => {
    resetCountDown();
    setGameState("Letter Countdown");
  };

  const submitPrediction = async (img: string) => {
    let prediction: LetterPrediction;
    try {
      prediction = await predict_letter(img);
    } catch (predictionError: any) {
      setError("Something has gone wrong, try again...");
      setCurrentPrediction(null);
      setGameState("User Check");
      return;
    }
    if (prediction.predictionStatus === "success") {
      setCurrentPrediction(prediction.prediction.toUpperCase());
      setGameState("User Check");
    } else if (prediction.predictionStatus === "no_hand_detected") {
      setError("No hand detected, try again...");
      setGameState("User Check");
      setCurrentPrediction(null);
    } else {
      setError("Something has gone wrong, try again...");
    }
  };

  const handleLetterCountdownComplete = () => {
    const src = videoRef.current?.getScreenshot() || null;
    if (src) {
      setGameState("Predicting");
      submitPrediction(src);
    } else {
      console.log("No image captured");
    }
  };

  const countDownChild: (props: TimeProps) => React.ReactNode =
    gameState === "Letter Countdown"
      ? ({ remainingTime }) => (
          <div className="timer">
            <div className="timer-text">Taking photo in</div>
            <div className="timer-value">{remainingTime}</div>
          </div>
        )
      : () => <PredictionPanel>{prediction}</PredictionPanel>;

  return (
    <div className="video-container">
      <AlertSnackbar error={error} onClose={() => setError(null)} />
      <Grid
        container
        alignItems="center"
        direction="row"
        justifyContent="center"
        columns={{ xs: 6, md: 12 }}
        spacing={2}
      >
        <Grid item xs={6}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <CountdownCircleTimer
              key={countDownKey}
              isPlaying={gameState === "Letter Countdown"}
              duration={1.5}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[1.5, 1, 0.5, 0]}
              onComplete={handleLetterCountdownComplete}
              size={250}
            >
              {countDownChild}
            </CountdownCircleTimer>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <WebcamContainer ref={videoRef} />
        </Grid>
        <Grid item xs={6}>
          <Box textAlign="center">
            <Button
              variant="contained"
              onClick={startCaptureCountdown}
              disabled={
                gameState === "Predicting" || gameState === "Letter Countdown"
              }
              size="large"
            >
              {gameState === "Not Started" && "Start"}
              {gameState === "User Check" && "Next Letter"}
              {gameState === "Predicting" && "Predicting..."}
              {gameState === "Letter Countdown" && `Wait for it...`}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
