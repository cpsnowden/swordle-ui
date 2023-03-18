import { Box, Grid, IconButton, Stack, Tooltip } from "@mui/material";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import WebcamContainer from "components/WebcamContainer";
import { useReducer, useRef, useState } from "react";
import { CountdownCircleTimer, TimeProps } from "react-countdown-circle-timer";
import Webcam from "react-webcam";
import { LetterPrediction, predict_letter } from "services/api";
import GameRulesDialog from "./components/GameRulesDialog";
import { GameStats, getLevelSettings, Level, LevelSettings } from "./types";
import GameStatsContainer from "./components/GameStatsContainer";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  CorrectGuess,
  IncorrectGuess,
  NoHand,
} from "./components/GuessFeedback";
import GameFinishDialog from "./components/GameFinishDialog";
import { PageLayout } from "features/layout/page-layout";
import GameButton from "components/GameButton";
import GameButtonContainer from "components/GameButtonContainer";
import { useAlert } from "features/alerts";

type GameStatus =
  | "Complete"
  | "Not Started"
  | "Letter Countdown"
  | "Predicting"
  | "Show User - Incorrect"
  | "Show User - Correct"
  | "Show User - No Hand";

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

const defaultStats: GameStats = {
  score: 0,
  nStreaks: 0,
  streak: 0,
};

type GameState = {
  countDownKey: number;

  status: GameStatus;
  stats: GameStats;

  currentPrediction: string;
  currentTarget: string;
  remainingTargets: string;

  attemptsAtLetter: number;
  levelSettings: LevelSettings;
};

type GameAction =
  | { type: "go_to_next_letter" }
  | { type: "retry_letter" }
  | { type: "submit_attempt"; attempt: string }
  | { type: "start_game" }
  | { type: "stop_game" }
  | { type: "change_level"; level: Level };

// const characters = "ABCKLRVWXY";
const characters = "ABCKL";

const nextCharacterList = (): string => {
  return characters
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
};

const reducer = (prev: GameState, action: GameAction): GameState => {
  console.log("Action", action);
  switch (action.type) {
    case "stop_game":
      return {
        ...prev,
        status: "Not Started",
        remainingTargets: "",
        countDownKey: prev.countDownKey + 1,
        stats: defaultStats,
      };
    case "start_game":
      const characters = nextCharacterList();
      return {
        ...prev,
        status: "Letter Countdown",
        stats: defaultStats,
        countDownKey: prev.countDownKey + 1,
        currentTarget: characters[0],
        remainingTargets: characters.slice(1),
      };
    case "retry_letter":
      return {
        ...prev,
        status: "Letter Countdown",
        countDownKey: prev.countDownKey + 1,
      };
    case "go_to_next_letter":
      if (prev.remainingTargets.length === 0) {
        return {
          ...prev,
          status: "Complete",
        };
      }
      return {
        ...prev,
        status: "Letter Countdown",
        countDownKey: prev.countDownKey + 1,
        currentTarget: prev.remainingTargets[0],
        remainingTargets: prev.remainingTargets.slice(1),
        attemptsAtLetter: 0,
      };
    case "change_level":
      return { ...prev, levelSettings: getLevelSettings(action.level) };
    case "submit_attempt":
      // You've finished
      const attempt = action.attempt;
      if (attempt === "NO_HAND") {
        return {
          ...prev,
          status: "Show User - No Hand",
          countDownKey: prev.countDownKey + 1,
        };
      }
      if (attempt === prev.currentTarget) {
        const stats: GameStats = {
          ...prev.stats,
          score: prev.stats.score + 10,
          streak: prev.stats.streak + 1,
        };
        if (prev.stats.streak + 1 === 5) {
          stats.streak = 0;
          stats.nStreaks += 1;
          stats.score += 30;
        }
        return {
          ...prev,
          stats,
          status: "Show User - Correct",
          countDownKey: prev.countDownKey + 1,
          currentPrediction: attempt,
        };
      } else {
        return {
          ...prev,
          status: "Show User - Incorrect",
          stats: {
            ...prev.stats,
            streak: 0,
          },
          countDownKey: prev.countDownKey + 1,
          attemptsAtLetter: prev.attemptsAtLetter + 1,
          currentPrediction: attempt,
        };
      }
  }
};

export const QuickFire = () => {
  const [state, dispatch] = useReducer(reducer, {
    status: "Not Started",
    stats: defaultStats,
    currentPrediction: "",
    currentTarget: "",
    remainingTargets: "",
    attemptsAtLetter: 0,
    levelSettings: getLevelSettings(Level.Medium),
    countDownKey: 0,
  });
  const [isSettingsOpen, setSettingOpen] = useState(true);
  const videoRef = useRef<Webcam | null>(null);
  const { showError } = useAlert();

  const handleStart = () => {
    dispatch({ type: "start_game" });
  };

  const handleStop = () => {
    dispatch({ type: "stop_game" });
  };

  const handleSetLevel = (level: Level) => {
    dispatch({ type: "change_level", level });
  };

  const handleNextGame = () => {
    dispatch({ type: "stop_game" });
  };

  const handleCountdownComplete = () => {
    if (state.status === "Letter Countdown") {
      handleSubmitPrediction();
    } else if (state.status === "Show User - Correct") {
      dispatch({ type: "go_to_next_letter" });
    } else if (state.status === "Show User - Incorrect") {
      if (state.attemptsAtLetter <= state.levelSettings.retriesPerLetter) {
        dispatch({ type: "retry_letter" });
      } else {
        dispatch({ type: "go_to_next_letter" });
      }
    } else if (state.status === "Show User - No Hand") {
      dispatch({ type: "retry_letter" });
    }
  };

  const handleSubmitPrediction = async () => {
    const img = videoRef.current?.getScreenshot() || null;
    if (!img) {
      console.log("No image captured");
      return;
    }

    let prediction: LetterPrediction;
    try {
      prediction = await predict_letter(img);
    } catch (predictionError: any) {
      showError("Something has gone wrong, try again...");
      return;
    }

    if (prediction.predictionStatus === "success") {
      const predictedLetter = prediction.prediction.toUpperCase();
      dispatch({ type: "submit_attempt", attempt: predictedLetter });
    } else if (prediction.predictionStatus === "no_hand_detected") {
      dispatch({ type: "submit_attempt", attempt: "NO_HAND" });
    } else {
      showError("Something has gone wrong, try again...");
    }
  };

  const countDownChild: (props: TimeProps) => React.ReactNode =
    state.status === "Letter Countdown"
      ? ({ remainingTime }) => (
          <LetterCountdown
            target={state.currentTarget}
            remainingTime={remainingTime}
          />
        )
      : state.status === "Show User - Correct" && state.currentPrediction
      ? ({ remainingTime }) => <CorrectGuess remainingTime={remainingTime} />
      : state.status === "Show User - Incorrect" && state.currentPrediction
      ? ({ remainingTime }) => (
          <IncorrectGuess
            target={state.currentTarget}
            prediction={state.currentPrediction}
            remainingTime={remainingTime}
          />
        )
      : state.status === "Show User - No Hand"
      ? ({ remainingTime }) => <NoHand remainingTime={remainingTime} />
      : ({ remainingTime }) => null;

  const ruleButton = (
    <Tooltip title="Open Rules">
      <IconButton onClick={() => setSettingOpen(true)}>
        <InfoOutlinedIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <PageLayout rightHeaderPanel={ruleButton}>
      <GameRulesDialog
        isOpen={isSettingsOpen}
        onClose={() => setSettingOpen(false)}
        level={state.levelSettings.level}
        onLevelChange={handleSetLevel}
      />
      <GameFinishDialog
        isOpen={state.status === "Complete"}
        onNextGame={handleNextGame}
        gameStats={state.stats}
        level={state.levelSettings.level}
      />
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
          <Stack direction="column" spacing={2}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <CountdownCircleTimer
                key={state.countDownKey}
                isPlaying={
                  state.status === "Show User - Incorrect" ||
                  state.status === "Show User - Correct" ||
                  state.status === "Show User - No Hand" ||
                  state.status === "Letter Countdown"
                }
                duration={
                  state.status === "Letter Countdown"
                    ? state.levelSettings.secondsPerLetter
                    : 2
                }
                colors={
                  state.status === "Not Started"
                    ? // Grey
                      "#808080"
                    : state.status === "Letter Countdown" ||
                      state.status === "Predicting"
                    ? // Blue
                      "#004777"
                    : state.status === "Show User - Correct"
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
            <GameStatsContainer
              level={state.levelSettings.level}
              stats={state.stats}
              onLevelClick={() => setSettingOpen(true)}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <WebcamContainer ref={videoRef} />
        </Grid>
        <Grid item xs={6}>
          <GameButtonContainer>
            {state.status === "Not Started" ? (
              <GameButton color="success" onClick={handleStart}>
                <PlayArrowIcon sx={{ mr: 1 }} />
                Start
              </GameButton>
            ) : (
              <GameButton color="error" onClick={handleStop}>
                <StopIcon sx={{ mr: 1 }} />
                Stop
              </GameButton>
            )}
          </GameButtonContainer>
        </Grid>
      </Grid>
    </PageLayout>
  );
};
