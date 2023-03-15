import { Stack, Chip } from "@mui/material";
import { GameStats, Level } from "pages/QuickFire/types";

export interface GameStatsContainerProps {
  level: Level;
  stats: GameStats;
  lettersRemaining: number;
  onLevelClick: () => void;
}

export const GameStatsContainer: React.FC<GameStatsContainerProps> = ({
  level,
  stats,
  lettersRemaining,
  onLevelClick,
}) => {
  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      <Chip
        label={`${Level[level]} mode`}
        variant="outlined"
        onClick={onLevelClick}
      />
      <Chip
        label={`Score: ${stats.score}`}
        variant="outlined"
        color="success"
      />
      <Chip
        label={`Current Streak: ${stats.streak}`}
        variant="outlined"
        color="success"
      />
      {/* <Chip
        label={`${lettersRemaining} letters remaining`}
        variant="outlined"
        color="success"
      /> */}
      {/* <Chip label={`Streaks: ${stats.nStreaks}`} variant="outlined" /> */}
    </Stack>
  );
};
