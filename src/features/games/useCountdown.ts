import { useEffect, useRef, useState } from "react";

interface countdownParams {
  onFinish(): never;
  start?: number;
  finish: number;
  timePerStep?: number;
  startCondition?: boolean | undefined;
}

export function useCountdown(
  onFinish: () => void,
  finish: number,
  startCondition = true,
  start = 0,
  timePerStep = 1000
) {
  let [timeLeft, setTimeLeft] = useState(finish);
  let timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    function countDown(prev: number = start) {
      if (prev < finish) {
        timeoutRef.current = setTimeout(() => {
          prev++;
          setTimeLeft(finish - prev);
          countDown(prev);
        }, timePerStep);
      } else onFinish();
    }
    if (startCondition && !timeoutRef.current) countDown();
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [onFinish, start, finish, timePerStep, startCondition, setTimeLeft]);
  return timeLeft;
}
