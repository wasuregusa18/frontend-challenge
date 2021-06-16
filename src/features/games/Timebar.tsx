import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectCurrentGameStatus,
  finishGame,
  selectCurrentGameTime,
  uploadScore,
} from "./gamesSlice";
import { useCountdown } from "./useCountdown";
import { Progress } from "antd";
import "./Timebar.css";

export function Timebar() {
  // force unpack - because current Game should be set
  let gameStatus = useAppSelector(selectCurrentGameStatus)!;
  let gameTimeLimit = useAppSelector(selectCurrentGameTime)!;
  let dispatch = useAppDispatch();

  const normalise = (value: number): number => (value * 100) / gameTimeLimit;

  // GameEngineWrapper handles upload
  const onFinish = useCallback(() => {
    dispatch(finishGame());
  }, [dispatch]);
  const startCondition = gameStatus === "started";

  let timeLeft = useCountdown(onFinish, gameTimeLimit, startCondition);

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

// this is starting background color - with orientation need to do other way round
// it has a width of 8px so need to push 4 back

//
// background-color: this is ending background color
