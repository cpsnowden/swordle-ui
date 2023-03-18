import { Stack, Chip, Tooltip } from "@mui/material";
import { GameStats, Level } from "features/games/quickfire/types";

export interface GameStatsContainerProps {
  level: Level;
  stats: GameStats;
  onLevelClick: () => void;
}

export const GameStatsContainer: React.FC<GameStatsContainerProps> = ({
  level,
  stats,
  onLevelClick,
}) => {
  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      <Tooltip title="Change Level">
        <Chip
          label={`${Level[level]}`}
          variant="outlined"
          onClick={onLevelClick}
        />
      </Tooltip>
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
    </Stack>
  );
};
