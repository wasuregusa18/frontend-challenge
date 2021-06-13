import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCurrentGameEnd, selectScore } from "./gamesSlice";

interface GameInfoProps {
  name: string;
}

export function GameScore({ name }: GameInfoProps) {
  let endText = useAppSelector(selectCurrentGameEnd);
  let score = useAppSelector(selectScore);

  return (
    <div>
      <p>{endText}</p>
      {score ? (
        <p>Your Score was {score}</p>
      ) : (
        <p>
          No Score avaliable
          <Link to={`/game/${name}/intro`}>play the game</Link>
        </p>
      )}
    </div>
  );
}
