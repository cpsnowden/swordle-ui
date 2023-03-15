import { useState } from "react";

const randomInt = (n: number): number => Math.floor(Math.random() * n);

export const useChoice = <P>(from: P[]) => {
  const [choice] = useState(
    () => from[randomInt(from.length)]
  );
  return choice
}
