export enum Level {
  Easy = 0,
  Medium = 1,
  Hard = 2,
  Insane = 3,
}

export type LevelSettings = {
  secondsPerLetter: number
  retriesPerLetter: number
}

export type GameStats = {
  score: number;
  nStreaks: number;
  streak: number;
};

const LEVEL_SETTINGS = {
  [Level.Easy]: {
    secondsPerLetter: 5,
    retriesPerLetter: 1
  },
  [Level.Medium]: {
    secondsPerLetter: 3,
    retriesPerLetter: 1
  },
  [Level.Hard]: {
    secondsPerLetter: 3,
    retriesPerLetter: 0
  },
  [Level.Insane]: {
    secondsPerLetter: 1,
    retriesPerLetter: 0
  }
}

export const getLevelSettings = (level: Level): LevelSettings => {
  return LEVEL_SETTINGS[level];
}
