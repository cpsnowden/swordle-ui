import {
  Box,
  Button,
  Dialog,
  IconButton,
  DialogTitle,
  Grid,
  Tooltip,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import WordleGrid from "pages/Wordle/components/WordleGrid";
import { LetterPrediction, predict_letter } from "services/api";
import Webcam from "react-webcam";
import { CELL_REVEAL_MS } from "services/params";
import { useCountdown } from "usehooks-ts";
import ConfettiExplosion from "react-confetti-explosion";
import AlertSnackbar from "components/AlertSnackbar";
import WebcamContainer from "components/WebcamContainer";
import BasePage from "layouts/BasePage";
import GameRulesDialog from "./components/GameRulesDialog";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

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
    <DialogTitle>
      {finishState === "LOSE"
        ? `You have lost, the solution was ${solution}`
        : "Horray, you have won"}
    </DialogTitle>
    <ConfettiExplosion />
  </Dialog>
);
export interface WordleProps {
  solution?: string;
  numberOfAttempts?: number;
}

export const Wordle: React.FC<WordleProps> = ({
  solution = "CAMEL",
  numberOfAttempts = 6,
}) => {
  const [isSettingsOpen, setSettingOpen] = useState(false);
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

  const confirmLetter = () => {
    setCurrentLetter(undefined);
    setCurrentGuess((currentGuess) => [...currentGuess, currentLetter!]);
  };

  const handleStartRow = () => {
    startCaptureCountdown();
  };

  const handleNextLetter = () => {
    confirmLetter();
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

  const validateGuess = (row: string[], currentLetter?: string) => {
    const newRow: string[] = [...row, currentLetter!];

    confirmLetter();
    setGameState("Validating");
    setTimeout(() => {
      setGameState("Not Started");
    }, CELL_REVEAL_MS * solution.length);
    setPreviousGuesses((previousGuesses) => [...previousGuesses, newRow]);
    setCurrentGuess([]);
    if (newRow.join("") === solution) {
      setFinishState("WIN");
      return;
    }
    if (previousGuesses.length === numberOfAttempts - 1) {
      setFinishState("LOSE");
    }
  };

  const handleRetryLetter = () => {
    startCaptureCountdown();
  };

  useEffect(() => {
    if (count === 0 && gameState === "Letter Countdown") {
      submitPrediction();
    }
  }, [count, gameState, submitPrediction]);

  const ruleButton = (
    <Tooltip title="Open Rules">
      <IconButton onClick={() => setSettingOpen(true)}>
        <InfoOutlinedIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <BasePage rightHeaderPanel={ruleButton}>
      <AlertSnackbar error={error} onClose={() => setError(null)} />
      <GameCompleteDialog finishState={finishState} solution={solution} />
      <GameRulesDialog
        isOpen={isSettingsOpen}
        onClose={() => setSettingOpen(false)}
      />
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
            numberOfAttempts={numberOfAttempts}
            currentLetter={currentLetter}
          />
        </Grid>
        <Grid item xs={6}>
          <WebcamContainer ref={videoRef} />
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
              (gameState === "Not Started" ? (
                <Button
                  variant="contained"
                  onClick={handleStartRow}
                  size="large"
                >
                  Start Row
                </Button>
              ) : gameState === "Predicting" ? (
                <Button variant="contained" size="large" disabled>
                  Predicting...
                </Button>
              ) : gameState === "Letter Countdown" ? (
                <Button variant="contained" size="large" disabled>
                  {`Taking screenshot in ${count}`}
                </Button>
              ) : null)}
            {gameState === "User Check" &&
              (currentGuess.length < solution.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleNextLetter}
                  size="large"
                >
                  Next Letter
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => validateGuess(currentGuess, currentLetter)}
                  size="large"
                >
                  Validate
                </Button>
              ))}
          </Box>
        </Grid>
      </Grid>
    </BasePage>
  );
};
