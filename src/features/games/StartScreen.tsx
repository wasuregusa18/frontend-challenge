import { Container, IconButton } from "@material-ui/core";

import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectAudioSettings, startGame, toggleAudio } from "./gamesSlice";
import { useCountdown } from "./useCountdown";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { Button } from "antd";
import "./StartScreen.css";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { playAudio } from "./helper";

const countdownFrom = 3;

export function StartScreen() {
  //   let isAudioOn = useAppSelector(selectAudioSettings);
  let [isStarting, Start] = useState(false);
  let dispatch = useAppDispatch();

  // audio
  let isAudioOn = useAppSelector(selectAudioSettings);
  const countdown = new Audio("/countdown.mp3");

  const onFinish = useCallback(() => {
    dispatch(startGame());
  }, [dispatch]);

  let timeLeft = useCountdown(onFinish, countdownFrom + 1, isStarting);

  const hideIfStarting = (
    isStarting ? { visibility: "hidden" } : {}
  ) as CSSProperties;

  return (
    <div className="start-container">
      <br />
      <IconButton
        onClick={() => {
          Start(true);
          isAudioOn && playAudio(countdown);
        }}
        className={!isStarting ? "start-button" : "start-countdown"}
      >
        {!isStarting ? (
          <PlayArrowIcon className="start-icon" />
        ) : (
          <div className="start-number">
            {timeLeft > 1 ? timeLeft - 1 : "Go!"}
          </div>
        )}
      </IconButton>
      <p style={hideIfStarting} className="start-text">
        Start the Game
      </p>
      <br />
      <Link to={`intro`} className="instruction-link" style={hideIfStarting}>
        Instructions
      </Link>
    </div>
  );
}
