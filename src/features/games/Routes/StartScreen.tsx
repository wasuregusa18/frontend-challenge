import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { useAppSelector } from "../../../app/hooks";
import { selectAudioSettings } from "../gamesSliceSelectors";
import { playAudio } from "../../../helper";
import { StartCountdown } from "../Components/StartCountdown";
import "./StartScreen.css";

// startcountdown dispatches the start game when countdown finishes
export function StartScreen() {
  //   let isAudioOn = useAppSelector(selectAudioSettings);
  let [isStarting, Start] = useState(false);

  // to prevent audio playing multiple times
  let hasBeenClicked = useRef(false);

  // audio
  let isAudioOn = useAppSelector(selectAudioSettings);
  const countdown = new Audio("/countdown.mp3");

  const hideIfStarting = (
    isStarting ? { visibility: "hidden" } : {}
  ) as CSSProperties;

  return (
    <div className="start-container">
      <br />
      <IconButton
        onClick={() => {
          Start(true);
          isAudioOn && !hasBeenClicked.current && playAudio(countdown);
          hasBeenClicked.current = true;
        }}
        className={!isStarting ? "start-button" : "start-countdown"}
      >
        {!isStarting ? (
          <PlayArrowIcon className="start-icon" aria-label="Start Countdown" />
        ) : (
          <StartCountdown isStarting={isStarting} />
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
