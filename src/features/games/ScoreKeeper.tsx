import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectScore } from "./gamesSlice";
import "./ScoreKeeper.css";

export function ScoreKeeper() {
  let currentScore = useAppSelector(selectScore);

  return (
    <div className="score-container">
      <p className="score-title">SCORE</p>
      <p className="score-number">{currentScore}</p>
    </div>
  );
}
