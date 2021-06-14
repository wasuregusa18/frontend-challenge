import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectScore } from "./gamesSlice";

export function ScoreKeeper() {
  let currentScore = useAppSelector(selectScore);

  return (
    <div>
      <p>Score</p>
      <p>{currentScore}</p>
    </div>
  );
}
