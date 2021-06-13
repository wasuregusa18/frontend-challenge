import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCurrentGameIntro } from "./gamesSlice";

interface GameInfoProps {
  name: string;
}

export function GameIntro({ name }: GameInfoProps) {
  let introText = useAppSelector(selectCurrentGameIntro);

  return (
    <>
      <p>{introText}</p>
      <Link to={`/game/${name}/play`}>I understand</Link>
    </>
  );
}
