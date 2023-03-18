import { useState, useRef, useCallback } from "react";
import { useEffectOnce } from "../../hooks/useEffectOnce";

export type PingState = "waiting" | "ok" | "error";

export const usePing = (interval: number, pingFn: () => Promise<Boolean>) => {
  const [pingState, setPingState] = useState<PingState>("waiting");
  const timerRef = useRef<NodeJS.Timeout>();
  const mountedRef = useRef(false);

  const doPingAndReschedule = useCallback(async () => {
    const result = await pingFn();
    if (mountedRef.current) {
      setPingState(result ? "ok" : "error");
      timerRef.current = setTimeout(doPingAndReschedule, interval);
    }
  }, [setPingState, interval, pingFn]);

  useEffectOnce(() => {
    mountedRef.current = true;
    doPingAndReschedule();
    return () => {
      mountedRef.current = false;
      clearInterval(timerRef.current);
    };
  });

  return {
    pingState,
  };
};
