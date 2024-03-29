import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Button } from "antd";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { resetGame } from "../gamesSlice";
import {
  selectCurrentGameEnd,
  selectCurrentGameStatus,
  selectScore,
} from "../gamesSliceSelectors";
import "./GameScore.css";

export function GameScore() {
  let endText = useAppSelector(selectCurrentGameEnd);
  let score = useAppSelector(selectScore);
  let gameStatus = useAppSelector(selectCurrentGameStatus);
  let dispatch = useAppDispatch();

  if (gameStatus === "new") {
    return <Redirect to="intro" />;
  } else if (gameStatus === "started") return <Redirect to="play" />;

  return (
    <div className="end-container">
      <p className="end-thank-you">Thank you</p>
      <p className="score-text">Your score is {score}</p>
      <p className="end-text">{endText}</p>
      <br />
      <div className="links-container">
        <Link to="/">
          <Button className="end-link" shape="round">
            Home
          </Button>
        </Link>
        <Link to="intro" onClick={() => dispatch(resetGame())}>
          <Button className="end-link" shape="round">
            Play Again
          </Button>
        </Link>
      </div>
    </div>
  );
}
