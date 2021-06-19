import { useCallback } from "react";
import { Progress } from "antd";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { finishGame, updateTime } from "../gamesSlice";
import {
  selectCurrentGameStatus,
  selectCurrentGameTime,
} from "../gamesSliceSelectors";
import { useCountdown } from "../hooks/useCountdown";
import { RootState } from "../../../app/store";
import { uploadScore } from "../gamesAPI";
import "./Timebar.css";

export function Timebar() {
  // force unpack - because current Game should be set
  let gameStatus = useAppSelector(selectCurrentGameStatus)!;
  let gameTimeLimit = useAppSelector(selectCurrentGameTime)!;
  let storeTimeLeft = useAppSelector(
    (store: RootState) => store.games.currentGame?.timeLeft
  )!;
  let dispatch = useAppDispatch();

  const normalise = (value: number): number => (value * 100) / gameTimeLimit;

  const onFinish = useCallback(() => {
    dispatch(finishGame());
    dispatch(uploadScore());
  }, [dispatch]);
  const startCondition = gameStatus === "started";

  // update store every tick
  // this way store keeps complete state
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
