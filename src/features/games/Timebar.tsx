import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectCurrentGameStatus,
  finishGame,
  selectCurrentGameTime,
  uploadScore,
} from "./gamesSlice";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useCountdown } from "./useCountdown";

export function Timebar() {
  // force unpack - because current Game should be set
  let gameStatus = useAppSelector(selectCurrentGameStatus)!;
  let gameTimeLimit = useAppSelector(selectCurrentGameTime)!;
  gameTimeLimit = 10;
  let dispatch = useAppDispatch();
  //   let [remainingCount, setCount] = useState(gameTimeLimit);
  //   let timeoutRef = useRef<NodeJS.Timeout>();

  const normalise = (value: number): number => (value * 100) / gameTimeLimit;

  //   useEffect(() => {
  //     function countDown(prev: number = 0) {
  //       if (prev < gameTimeLimit) {
  //         timeoutRef.current = setTimeout(() => {
  //           prev++;
  //           setCount(gameTimeLimit - prev);
  //           countDown(prev);
  //         }, 1000);
  //       } else dispatch(finishGame());
  //     }
  //     if (gameStatus === "started" && !timeoutRef.current) countDown();
  //     return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  //   }, [gameStatus, setCount, dispatch, gameTimeLimit]);

  const onFinish = useCallback(() => {
    dispatch(finishGame());
    dispatch(uploadScore());
  }, [dispatch]);
  const startCondition = gameStatus === "started";

  let timeLeft = useCountdown(onFinish, gameTimeLimit, startCondition);

  return (
    <>
      <LinearProgress variant="determinate" value={normalise(timeLeft)} />
      <p>Time</p>
      <p>{timeLeft}</p>
    </>
  );
}
