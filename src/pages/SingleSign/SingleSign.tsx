import { Box, Grid, IconButton, Typography } from "@mui/material";
import { WebcamContainer } from "features/webcam";
import { PageLayout } from "components/layout/page-layout";
import { useRef, useState } from "react";
import { CountdownCircleTimer, TimeProps } from "react-countdown-circle-timer";
import Webcam from "react-webcam";
import { LetterPrediction, predict_letter } from "services/api";
import "./SingleSign.css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { GameButton, GameButtonContainer } from "features/games/common";
import { useAlert } from "features/alerts";

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

  const { showError } = useAlert();

  const startCaptureCountdown = () => {
    resetCountDown();
    setGameState("Letter Countdown");
  };

  const submitPrediction = async (img: string) => {
    let prediction: LetterPrediction;
    try {
      prediction = await predict_letter(img);
    } catch (predictionError: any) {
      showError("Something has gone wrong, try again...");
      setCurrentPrediction(null);
      setGameState("User Check");
      return;
    }
    if (prediction.predictionStatus === "success") {
      setCurrentPrediction(prediction.prediction.toUpperCase());
      setGameState("User Check");
    } else if (prediction.predictionStatus === "no_hand_detected") {
      showError("No hand detected, try again...");
      setGameState("User Check");
      setCurrentPrediction(null);
    } else {
      showError("Something has gone wrong, try again...");
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

  const countDownChild: (props: TimeProps) => React.ReactNode = ({
    remainingTime,
  }) => {
    return gameState === "Letter Countdown" ? (
      <div className="timer">
        <div className="timer-text">Taking photo in</div>
        <div className="timer-value">{remainingTime}</div>
      </div>
    ) : gameState === "User Check" ? (
      <PredictionPanel>{prediction}</PredictionPanel>
    ) : null;
  };

  const ruleButton = (
    <IconButton disabled>
      <InfoOutlinedIcon />
    </IconButton>
  );

  return (
    <PageLayout rightHeaderPanel={ruleButton}>
      <Grid
        container
        alignItems="center"
        direction="row"
        justifyContent="center"
        columns={{ xs: 6, md: 12 }}
        spacing={2}
        minHeight="90vh"
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
          <GameButtonContainer>
            {gameState === "Predicting" || gameState === "Letter Countdown" ? (
              <GameButton disabled>
                {gameState === "Predicting" && "Predicting..."}
                {gameState === "Letter Countdown" && `Wait for it...`}
              </GameButton>
            ) : (
              <GameButton color="success" onClick={startCaptureCountdown}>
                {gameState === "Not Started" && "Start"}
                {gameState === "User Check" && "Next Letter"}
              </GameButton>
            )}
          </GameButtonContainer>
        </Grid>
      </Grid>
    </PageLayout>
  );
};
