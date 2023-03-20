import { FC } from "react";
import { GameButtonContainer, GameButton } from "features/games/common";
import { GameStatus } from "../types";

export interface ControlPanelProps {
  gameStatus: GameStatus;
  onStart: () => void;
  onNextLetter: () => void;
}

export const ControlPanel: FC<ControlPanelProps> = ({
  gameStatus,
  onStart,
  onNextLetter,
}) => (
  <GameButtonContainer>
    {gameStatus === "not_started" ? (
      <GameButton color="success" onClick={onStart}>
        Start
      </GameButton>
    ) : gameStatus === "capture_countdown" ? (
      <GameButton disabled>Wait for it...</GameButton>
    ) : gameStatus === "predicting" ? (
      <GameButton disabled>Predicting...</GameButton>
    ) : gameStatus === "show_user" ? (
      <GameButton color="success" onClick={onNextLetter}>
        "Next Letter"
      </GameButton>
    ) : null}
  </GameButtonContainer>
);
