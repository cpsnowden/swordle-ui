import { useState, useRef, useCallback } from "react";
import { ping } from "services/api";
import { useEffectOnce } from "./useEffectOne";

export type ApiPingState = "waiting" | "ok" | "error";

export const useApiPing = (interval: number) => {
  const [pingState, setPingState] = useState<ApiPingState>("waiting");
  const timerRef = useRef<NodeJS.Timeout>();
  const mountedRef = useRef(false);

  const doPingAndReschedule = useCallback(async () => {
    const result = await ping();
    if (mountedRef.current) {
      setPingState(result ? "ok" : "error");
      timerRef.current = setTimeout(doPingAndReschedule, interval);
    }
  }, [setPingState, interval]);

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
