export enum Level {
  Easy = 0,
  Medium = 1,
  Hard = 2,
  Insane = 3,
}

export type LevelSettings = {
  level: Level;
  secondsPerLetter: number;
  retriesPerLetter: number;
};

export type GameStats = {
  score: number;
  nStreaks: number;
  streak: number;
};

const LEVEL_SETTINGS = {
  [Level.Easy]: {
    secondsPerLetter: 5,
    retriesPerLetter: 1,
    level: Level.Easy,
  },
  [Level.Medium]: {
    secondsPerLetter: 3,
    retriesPerLetter: 1,
    level: Level.Medium,
  },
  [Level.Hard]: {
    secondsPerLetter: 3,
    retriesPerLetter: 0,
    level: Level.Hard,
  },
  [Level.Insane]: {
    secondsPerLetter: 1,
    retriesPerLetter: 0,
    level: Level.Insane,
  },
};

export const getLevelSettings = (level: Level): LevelSettings => {
  return LEVEL_SETTINGS[level];
};
