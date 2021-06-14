import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCurrentGameIntro, resetGame } from "./gamesSlice";

interface GameInfoProps {
  name: string;
}

export function GameIntro({ name }: GameInfoProps) {
  let introText = useAppSelector(selectCurrentGameIntro);
  // let dispatch = useAppDispatch();
  // dispatch(resetGame());

  return (
    <>
      <p>{introText}</p>
      <Link to={`play`}>I understand</Link>
    </>
  );
}
