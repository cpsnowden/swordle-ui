import { axiosClient } from "lib/axios";
import { useState, useRef, useCallback } from "react";
import { useEffectOnce } from "../../hooks/use-effect-once";

export type PingState = "waiting" | "ok" | "error";

const tryPing = async (): Promise<boolean> => {
  try {
    await axiosClient.get("/");
  } catch {
    return false;
  }
  return true;
};

export const usePing = (interval: number) => {
  const [pingState, setPingState] = useState<PingState>("waiting");
  const timerRef = useRef<NodeJS.Timeout>();
  const mountedRef = useRef(false);

  const doPingAndReschedule = useCallback(async () => {
    const result = await tryPing();
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
