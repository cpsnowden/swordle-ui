import { Box, Button, Dialog, DialogTitle, Grid } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { WordleGrid } from "pages/Wordle/grid/WordleGrid/WordleGrid";
import { LetterPrediction, predict_letter } from "services/api";
import Webcam from "react-webcam";
import { videoConstraints } from "services/params";
import { useCountdown } from "usehooks-ts";
import ConfettiExplosion from "react-confetti-explosion";
import AlertSnackbar from "components/AlertSnackbar";

type FinishState = "WIN" | "LOSE";

type GameStatus =
  | "Not Started"
  | "Letter Countdown"
  | "Predicting"
  | "User Check"
  | "Retry"
  | "Validating";

interface GameCompleteDialogProps {
  finishState?: FinishState;
  solution: string;
}

const GameCompleteDialog: React.FC<GameCompleteDialogProps> = ({
  finishState,
  solution,
}) => (
  <Dialog open={!!finishState}>
    <DialogTitle id="alert-dialog-title">
      {finishState === "LOSE"
        ? `You have lost, the solution was ${solution}`
        : "Horray, you have won"}
    </DialogTitle>
    <ConfettiExplosion />
  </Dialog>
);
export interface WordleProps {
  solution?: string;
}

export const Wordle: React.FC<WordleProps> = ({ solution = "APPLE" }) => {
  const [finishState, setFinishState] = useState<FinishState>();
  const [gameState, setGameState] = useState<GameStatus>("Not Started");
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 2,
    countStop: 0,
    intervalMs: 1000,
  });
  const [previousGuesses, setPreviousGuesses] = useState<string[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [currentLetter, setCurrentLetter] = useState<string>();

  const videoRef = useRef<Webcam | null>(null);

  const [error, setError] = useState<string | null>(null);

  const submitToPredictionApi = async (img: string) => {
    let prediction: LetterPrediction;
    try {
      prediction = await predict_letter(img);
    } catch (predictionError: any) {
      setError("Something has gone wrong, try again...");
      setGameState("User Check");
      return;
    }
    if (prediction.predictionStatus === "success") {
      setCurrentLetter(prediction.prediction.toUpperCase());
      setGameState("User Check");
    } else if (prediction.predictionStatus === "no_hand_detected") {
      setError("No hand detected, try again...");
      setGameState("Retry");
    } else {
      setError("Something has gone wrong, try again...");
    }
  };

  const startCaptureCountdown = () => {
    resetCountdown();
    startCountdown();
    setGameState("Letter Countdown");
  };

  const handleStartRow = () => {
    startCaptureCountdown();
  };

  const handleNextLetter = () => {
    setCurrentLetter(undefined);
    setCurrentGuess((currentGuess) => [...currentGuess, currentLetter!]);
    startCaptureCountdown();
  };

  const submitPrediction = useCallback(() => {
    const src = videoRef.current?.getScreenshot() || null;
    if (src) {
      setGameState("Predicting");
      submitToPredictionApi(src);
    } else {
      console.log("No image captured!");
    }
  }, [videoRef]);

  const validateGuess = () => {
    setGameState("Validating");
    setTimeout(() => {
      setGameState("Not Started");
    }, 350 * 5);
    setPreviousGuesses((previousGuesses) => [...previousGuesses, currentGuess]);

    if (previousGuesses.length === 6 - 1) {
      checkIfWon();
    }
    setCurrentGuess([]);
  };

  const handleRetryLetter = () => {
    startCaptureCountdown();
  };

  const checkIfWon = () => {
    if (currentGuess.join("") === solution) {
      setFinishState("WIN");
    } else {
      setFinishState("LOSE");
    }
  };

  useEffect(() => {
    if (count === 0 && gameState === "Letter Countdown") {
      submitPrediction();
    }
  }, [count, gameState, submitPrediction]);

  return (
    <>
      <AlertSnackbar error={error} onClose={() => setError(null)} />
      <GameCompleteDialog finishState={finishState} solution={solution} />
      <Grid
        container
        alignItems="center"
        direction="row"
        justifyContent="center"
        columns={{ xs: 6, md: 12 }}
        spacing={2}
      >
        <Grid item xs={6}>
          <WordleGrid
            solution={solution}
            currentGuess={currentGuess}
            guesses={previousGuesses}
            isRevealing={gameState === "Validating"}
            numberOfAttempts={6}
            currentLetter={currentLetter}
          />
        </Grid>
        <Grid item xs={6}>
          <Webcam
            audio={false}
            videoConstraints={videoConstraints}
            ref={videoRef}
          />
        </Grid>
        <Grid item xs={6}>
          <Box textAlign="center">
            {(gameState === "User Check" || gameState === "Retry") && (
              <Button
                variant="contained"
                onClick={handleRetryLetter}
                size="large"
              >
                Retry
              </Button>
            )}
            {currentGuess.length < solution.length &&
              gameState === "User Check" && (
                <Button
                  variant="contained"
                  onClick={handleNextLetter}
                  size="large"
                >
                  Next Letter
                </Button>
              )}
            {currentGuess.length < solution.length &&
              gameState === "Not Started" && (
                <Button
                  variant="contained"
                  onClick={handleStartRow}
                  size="large"
                >
                  Start Row
                </Button>
              )}
            {currentGuess.length < solution.length &&
              (gameState === "Predicting" ||
                gameState === "Letter Countdown") && (
                <Button variant="contained" size="large" disabled>
                  {gameState === "Predicting" && "Predicting..."}
                  {gameState === "Letter Countdown" &&
                    `Taking screenshot in ${count}`}
                </Button>
              )}

            {currentGuess.length === solution.length && (
              <Button variant="contained" onClick={validateGuess} size="large">
                Validate
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
