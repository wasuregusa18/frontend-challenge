import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectAudioSettings, startGame, toggleAudio } from "./gamesSlice";
import { useCountdown } from "./useCountdown";

const countdownFrom = 3;

export function StartScreen() {
  //   let isAudioOn = useAppSelector(selectAudioSettings);
  let [isStarting, Start] = useState(false);
  let dispatch = useAppDispatch();

  const onFinish = useCallback(() => {
    dispatch(startGame());
  }, [dispatch]);

  let timeLeft = useCountdown(onFinish, countdownFrom, isStarting);

  return (
    <>
      <button onClick={() => Start(true)}>Start the Game</button>
      <Link to={`intro`}>Instructions</Link>
      <p>{timeLeft}</p>
      <br />
    </>
  );
}
