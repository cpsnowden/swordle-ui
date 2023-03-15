import { Stack, Chip } from "@mui/material";
import { GameStats, Level } from "pages/QuickFire/types";

export interface GameStatsContainerProps {
  level: Level;
  stats: GameStats;
}

export const GameStatsContainer: React.FC<GameStatsContainerProps> = ({
  level,
  stats,
}) => {
  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      <Chip label={`${Level[level]} mode`} variant="outlined" />
      <Chip label={`Score: ${stats.score}`} variant="outlined" />
      <Chip label={`Current Streak: ${stats.streak}`} variant="outlined" />
      {/* <Chip label={`Streaks: ${stats.nStreaks}`} variant="outlined" /> */}
    </Stack>
  );
};
