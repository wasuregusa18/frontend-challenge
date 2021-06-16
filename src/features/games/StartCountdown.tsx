import React, { useCallback } from "react";
import { useAppDispatch } from "../../app/hooks";
import { startGame } from "./gamesSlice";
import { useCountdown } from "./useCountdown";

const countdownFrom = 3;

interface countdownProps {
  isStarting: boolean;
}
export function StartCountdown({ isStarting }: countdownProps) {
  let dispatch = useAppDispatch();

  const onFinish = useCallback(() => {
    dispatch(startGame());
  }, [dispatch]);

  let timeLeft = useCountdown(onFinish, countdownFrom + 1, isStarting);

  return (
    <div className="start-number">{timeLeft > 1 ? timeLeft - 1 : "Go!"}</div>
  );
}
