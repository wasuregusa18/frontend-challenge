import { Container } from "@material-ui/core";
import { Button, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./GameScore.css";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  resetGame,
  selectCurrentGameEnd,
  selectCurrentGameStatus,
  selectScore,
} from "./gamesSlice";

interface GameInfoProps {
  name: string;
}

export function GameScore({ name }: GameInfoProps) {
  let endText = useAppSelector(selectCurrentGameEnd);
  let score = useAppSelector(selectScore);
  let gameStatus = useAppSelector(selectCurrentGameStatus);
  let dispatch = useAppDispatch();

  if (gameStatus !== "finished") {
    return <Redirect to="/intro" />;
  }

  return (
    <div className="end-container">
      <p className="end-thank-you">Thank you</p>
      <p className="score-text">Your score is {score}</p>
      <p className="end-text">{endText}</p>
      <br />
      <div className="links-container">
        <Link to="/" onClick={() => dispatch(resetGame())}>
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
