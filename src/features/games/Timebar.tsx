import React, { useCallback, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectCurrentGameStatus,
  finishGame,
  updateTime,
  selectCurrentGameTime,
} from "./gamesSlice";
import { useCountdown } from "./useCountdown";
import { Progress } from "antd";
import "./Timebar.css";
import { RootState } from "../../app/store";

export function Timebar() {
  // force unpack - because current Game should be set
  let gameStatus = useAppSelector(selectCurrentGameStatus)!;
  let gameTimeLimit = useAppSelector(selectCurrentGameTime)!;
  let storeTimeLeft = useAppSelector(
    (store: RootState) => store.games.currentGame?.timeLeft
  )!;
  // gameTimeLimit = 10;
  let dispatch = useAppDispatch();

  const normalise = (value: number): number => (value * 100) / gameTimeLimit;

  // GameEngineWrapper handles upload
  const onFinish = useCallback(() => {
    dispatch(finishGame());
  }, [dispatch]);
  const startCondition = gameStatus === "started";

  // update store on dismount
  const onTick = useCallback(
    (remainingTime) => {
      dispatch(updateTime(remainingTime));
    },
    [dispatch]
  );

  let timeLeft = useCountdown(onFinish, storeTimeLeft, startCondition, onTick);

  return (
    <>
      <Progress
        percent={normalise(gameTimeLimit - timeLeft)}
        showInfo={false}
        className="timebar-progress"
      />
      <h3 className="timebar-title">TIME</h3>
      <h3 className="timebar-score">{timeLeft}</h3>
    </>
  );
}
