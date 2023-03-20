import { IconButton, Tooltip } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { SWordleGrid } from "./grid/swordle-grid";
import { LetterPrediction, predict_letter } from "services/api";
import Webcam from "react-webcam";
import { CELL_REVEAL_MS } from "config";
import { useCountdown } from "usehooks-ts";
import { WebcamContainer } from "features/webcam";
import { PageLayout } from "components/page-layout";
import { GameRulesDialog } from "./rules-dialog";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ResultDialog } from "./result-dialog";
import { FinishState, GameStatus } from "./types";
import {
  GameButton,
  GameButtonContainer,
  GameLayout,
} from "features/games/common";
import { useAlert } from "features/alerts";
export interface WordleProps {
  solution?: string;
  numberOfAttempts?: number;
}

export const Wordle: React.FC<WordleProps> = ({
  solution = "CAMEL",
  numberOfAttempts = 6,
}) => {
  const [isSettingsOpen, setSettingOpen] = useState(true);
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

  const { showError } = useAlert();

  const submitToPredictionApi = async (img: string) => {
    let prediction: LetterPrediction;
    try {
      prediction = await predict_letter(img);
    } catch (predictionError: any) {
      showError("Something has gone wrong, try again...");
      setGameState("User Check");
      return;
    }
    if (prediction.predictionStatus === "success") {
      setCurrentLetter(prediction.prediction.toUpperCase());
      setGameState("User Check");
    } else if (prediction.predictionStatus === "no_hand_detected") {
      showError("No hand detected, try again...");
      setGameState("Retry");
    } else {
      showError("Something has gone wrong, try again...");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <IconButton onClick={() => setSettingOpen(true)} sx={{ color: "white" }}>
        <InfoOutlinedIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <PageLayout rightHeaderPanel={ruleButton}>
      <ResultDialog
        finishState={finishState}
        solution={solution}
        onNextGame={() => {
          showError("Unfortunately not implemented, refresh page");
        }}
      />
      <GameRulesDialog
        isOpen={isSettingsOpen}
        onClose={() => setSettingOpen(false)}
      />
      <GameLayout
        feedbackPanel={
          <SWordleGrid
            solution={solution}
            currentGuess={currentGuess}
            guesses={previousGuesses}
            isRevealing={gameState === "Validating"}
            numberOfAttempts={numberOfAttempts}
            currentLetter={currentLetter}
          />
        }
        webcamPanel={<WebcamContainer ref={videoRef} />}
        buttonPanel={
          <GameButtonContainer>
            {(gameState === "User Check" || gameState === "Retry") && (
              <GameButton onClick={handleRetryLetter}>Retry Letter</GameButton>
            )}
            {currentGuess.length < solution.length &&
              (gameState === "Not Started" ? (
                <GameButton color="success" onClick={handleStartRow}>
                  Start Row
                </GameButton>
              ) : gameState === "Predicting" ? (
                <GameButton disabled>Predicting...</GameButton>
              ) : gameState === "Letter Countdown" ? (
                <GameButton disabled>{`Taking photo in ${count}`}</GameButton>
              ) : null)}
            {gameState === "User Check" &&
              (currentGuess.length < solution.length - 1 ? (
                <GameButton onClick={handleNextLetter}>Next Letter</GameButton>
              ) : (
                <GameButton
                  color="success"
                  onClick={() => validateGuess(currentGuess, currentLetter)}
                >
                  Validate
                </GameButton>
              ))}
            {gameState === "Validating" && (
              <GameButton disabled color="success">
                Validating...
              </GameButton>
            )}
          </GameButtonContainer>
        }
      />
    </PageLayout>
  );
};
