import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { resetGame, selectCurrentGameEnd, selectScore } from "./gamesSlice";

interface GameInfoProps {
  name: string;
}

export function GameScore({ name }: GameInfoProps) {
  let endText = useAppSelector(selectCurrentGameEnd);
  let score = useAppSelector(selectScore);
  let dispatch = useAppDispatch();

  return (
    <div>
      <p>{endText}</p>
      {score != null ? (
        <p>Your Score was {score}</p>
      ) : (
        <p>No Score avaliable</p>
      )}
      <Link to={`intro`} onClick={() => dispatch(resetGame())}>
        Play Again
      </Link>
    </div>
  );
}
