import React, { Suspense, useState } from "react";
import { Redirect } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCurrentGameStatus, startGame, finishGame } from "./gamesSlice";
import { GameFramework } from "./GameFramework";
import { StartScreen } from "./StartScreen";

import DoubleTrouble from "./GameEngines/double-trouble";
interface GameContentProps {
  name: string;
}

export function GameContent({ name }: GameContentProps) {
  let gameStatus = useAppSelector(selectCurrentGameStatus);
  let dispatch = useAppDispatch();

  // currentGame not set
  if (!gameStatus) return <p>Game Not found</p>;
  // currentGame finished
  if (gameStatus === "finished") return <Redirect to={`/game/${name}/score`} />;

  const GameEngine = React.lazy(() => import(`./GameEngines/${name}`));

  return (
    <GameFramework>
      {gameStatus === "new" ? (
        <>
          <StartScreen />
        </>
      ) : (
        <>
          <DoubleTrouble />
          {/* <Suspense fallback={<div>Loading</div>}>{GameEngine}</Suspense> */}
          <button onClick={() => dispatch(finishGame())}>Finish me</button>
        </>
      )}
    </GameFramework>
  );
}
