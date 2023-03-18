import { Box, IconButton } from "@mui/material";
import { WebcamContainer } from "features/webcam";
import { PageLayout } from "components/layout/page-layout";
import { useRef, useState } from "react";
import { CountdownCircleTimer, TimeProps } from "react-countdown-circle-timer";
import Webcam from "react-webcam";
import { LetterPrediction, predict_letter } from "services/api";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useAlert } from "features/alerts";
import { GameLayout } from "../common/game-layout";
import { CountdownFeedback } from "./countdown/countdown.component";
import { Prediction } from "./prediction/prediction.component";
import { GameStatus } from "./types";
import { ControlPanel } from "./control-panel/control-panel.component";

// To see how much game logic can be moved into hook
export const SingleSign = () => {
  const [countDownKey, setCountdownKey] = useState(0);
  const resetCountDown = () => setCountdownKey((prev) => prev + 1);

  const [gameState, setGameState] = useState<GameStatus>("not_started");
  const [prediction, setCurrentPrediction] = useState<string | null>();

  const videoRef = useRef<Webcam | null>(null);

  const { showError } = useAlert();

  const startCaptureCountdown = () => {
    resetCountDown();
    setGameState("capture_countdown");
  };

  const submitPrediction = async (img: string) => {
    let prediction: LetterPrediction;
    try {
      prediction = await predict_letter(img);
    } catch (predictionError: any) {
      showError("Something has gone wrong, try again...");
      setCurrentPrediction(null);
      setGameState("show_user");
      return;
    }
    if (prediction.predictionStatus === "success") {
      setCurrentPrediction(prediction.prediction.toUpperCase());
      setGameState("show_user");
    } else if (prediction.predictionStatus === "no_hand_detected") {
      showError("No hand detected, try again...");
      setGameState("show_user");
      setCurrentPrediction(null);
    } else {
      showError("Something has gone wrong, try again...");
    }
  };

  const handleLetterCountdownComplete = () => {
    const src = videoRef.current?.getScreenshot() || null;
    if (src) {
      setGameState("predicting");
      submitPrediction(src);
    } else {
      console.log("No image captured");
    }
  };

  const countDownChild: (props: TimeProps) => React.ReactNode = ({
    remainingTime,
  }) => {
    return gameState === "capture_countdown" ? (
      <CountdownFeedback remainingTime={remainingTime} />
    ) : gameState === "show_user" && prediction ? (
      <Prediction letter={prediction} />
    ) : null;
  };

  const ruleButton = (
    <IconButton disabled>
      <InfoOutlinedIcon />
    </IconButton>
  );

  return (
    <PageLayout rightHeaderPanel={ruleButton}>
      <GameLayout
        feedbackPanel={
          <Box display="flex" justifyContent="center" alignItems="center">
            <CountdownCircleTimer
              key={countDownKey}
              isPlaying={gameState === "capture_countdown"}
              duration={1.5}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[1.5, 1, 0.5, 0]}
              onComplete={handleLetterCountdownComplete}
              size={250}
            >
              {countDownChild}
            </CountdownCircleTimer>
          </Box>
        }
        webcamPanel={<WebcamContainer ref={videoRef} />}
        buttonPanel={
          <ControlPanel
            gameStatus={gameState}
            onStart={startCaptureCountdown}
            onNextLetter={startCaptureCountdown}
          />
        }
      />
    </PageLayout>
  );
};