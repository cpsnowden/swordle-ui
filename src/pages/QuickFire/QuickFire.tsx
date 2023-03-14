import { Box, Button, Grid, Stack } from "@mui/material";
import AlertSnackbar from "components/AlertSnackbar";
import WebcamContainer from "components/WebcamContainer";
import { useRef, useState } from "react";
import { CountdownCircleTimer, TimeProps } from "react-countdown-circle-timer";
import Webcam from "react-webcam";
import { LetterPrediction, predict_letter } from "services/api";
import "./QuickFire.css";

type GameStatus =
  | "Not Started"
  | "Letter Countdown"
  | "Predicting"
  | "Show User - Incorrect"
  | "Show User - Correct"
  | "Show User - No Hand";

// https://dreamyguy.github.io/react-emojis/
const NoHand = ({ remainingTime }: { remainingTime: number }) => {
  return (
    <Stack spacing={0} alignItems="center">
      <div className="text-4xl">🤔</div>
      <div className="text-2xl">No hand found...</div>
      <div className="text-2xl">Try again in {remainingTime}</div>
    </Stack>
  );
};

const IncorrectGuess = ({
  target,
  prediction,
  remainingTime,
}: {
  target: string;
  prediction: string;
  remainingTime: number;
}) => {
  return (
    <Stack spacing={0} alignItems="center">
      <div className="text-4xl">🙁</div>
      <div className="text-2xl">
        Incorrect {target} != {prediction}
      </div>
      <div className="text-2xl">Try again in {remainingTime}</div>
    </Stack>
  );
};

const CorrectGuess = ({ remainingTime }: { remainingTime: number }) => {
  return (
    <Stack spacing={0} alignItems="center">
      <div className="text-4xl">🥳</div>
      <div className="text-2xl">Correct</div>
      <div className="text-2xl">Next letter in {remainingTime}</div>
    </Stack>
  );
};

const LetterCountdown = ({
  target,
  remainingTime,
}: {
  target: string;
  remainingTime: number;
}) => {
  return (
    <Stack spacing={0} alignItems="center">
      <div className="text-2xl">Try to sign: {target}</div>
      <div className="text-2xl">Taking photo in {remainingTime}</div>
    </Stack>
  );
};

// TODO Add Hardness Levels
// that control speed
// and alphabet
const characters = "ABCKLRVWXY";

export const QuickFire = () => {
  const [gameState, setGameState] = useState<GameStatus>("Not Started");

  const [target, setTarget] = useState("A");
  const [prediction, setCurrentPrediction] = useState<string | null>();

  const [countDownKey, setCountdownKey] = useState(0);
  const resetCountDown = () => setCountdownKey((prev) => prev + 1);

  const videoRef = useRef<Webcam | null>(null);

  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setGameState("Letter Countdown");
    resetCountDown();
  };

  const handleStop = () => {
    setGameState("Not Started");
    resetCountDown();
  };

  const handleCountdownComplete = () => {
    if (gameState === "Letter Countdown") {
      handleSubmitPrediction();
    } else if (
      gameState === "Show User - Incorrect" ||
      gameState === "Show User - Correct" ||
      gameState === "Show User - No Hand"
    ) {
      if (gameState === "Show User - Correct") {
        setTarget(characters.charAt(Math.random() * characters.length));
      }
      handleShowUserComplete();
    }
  };

  const handleShowUserComplete = () => {
    // When show user is complete we restart the countdown
    setGameState("Letter Countdown");
    resetCountDown();
  };

  const handleSubmitPrediction = async () => {
    const img = videoRef.current?.getScreenshot() || null;
    if (!img) {
      console.log("No image captured");
      return;
    }

    setGameState("Predicting");
    let prediction: LetterPrediction;
    try {
      prediction = await predict_letter(img);
    } catch (predictionError: any) {
      setError("Something has gone wrong, try again...");
      setCurrentPrediction(null);
      setGameState("Not Started");
      return;
    }

    if (prediction.predictionStatus === "success") {
      const predictedLetter = prediction.prediction.toUpperCase();
      setCurrentPrediction(predictedLetter);

      if (predictedLetter === target) {
        setGameState("Show User - Correct");
      } else {
        setGameState("Show User - Incorrect");
      }
      resetCountDown();
    } else if (prediction.predictionStatus === "no_hand_detected") {
      setGameState("Show User - No Hand");
      resetCountDown();
      setCurrentPrediction(null);
    } else {
      setError("Something has gone wrong, try again...");
    }
  };

  const countDownChild: (props: TimeProps) => React.ReactNode =
    gameState === "Letter Countdown"
      ? ({ remainingTime }) => (
          <LetterCountdown target={target} remainingTime={remainingTime} />
        )
      : gameState === "Show User - Correct" && prediction
      ? ({ remainingTime }) => <CorrectGuess remainingTime={remainingTime} />
      : gameState === "Show User - Incorrect" && prediction
      ? ({ remainingTime }) => (
          <IncorrectGuess
            target={target}
            prediction={prediction}
            remainingTime={remainingTime}
          />
        )
      : gameState === "Show User - No Hand"
      ? ({ remainingTime }) => <NoHand remainingTime={remainingTime} />
      : ({ remainingTime }) => null;

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
              isPlaying={
                gameState === "Show User - Incorrect" ||
                gameState === "Show User - Correct" ||
                gameState === "Show User - No Hand" ||
                gameState === "Letter Countdown"
              }
              duration={gameState === "Letter Countdown" ? 3 : 2}
              colors={
                gameState === "Not Started"
                  ? // Grey
                    "#808080"
                  : gameState === "Letter Countdown" ||
                    gameState === "Predicting"
                  ? // Blue
                    "#004777"
                  : gameState === "Show User - Correct"
                  ? // Green
                    "#059611"
                  : "#A30000"
              }
              size={250}
              onComplete={handleCountdownComplete}
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
            {gameState === "Not Started" ? (
              <Button variant="contained" onClick={handleStart} size="large">
                Start the Clock
              </Button>
            ) : (
              <Button variant="contained" onClick={handleStop} size="large">
                Stop the Clock
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
