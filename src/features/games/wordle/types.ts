export type FinishState = "WIN" | "LOSE";

export type GameStatus =
  | "Not Started"
  | "Letter Countdown"
  | "Predicting"
  | "User Check"
  | "Retry"
  | "Validating";

export type CharStatus = "absent" | "present" | "correct";

// Move to somewhere
