import React, { Suspense, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCurrentGameStatus, startGame, finishGame } from "./gamesSlice";
import { GameFramework } from "./GameFramework";
import { StartScreen } from "./StartScreen";
import { Spin } from "antd";
import { Loading } from "./Loading";

function renderGameEngine(name: string) {
  return React.lazy(() => import("./GameEngines/" + name + "-engine"));
}
interface GameContentProps {
  name: string;
}

export function GameContent({ name }: GameContentProps) {
  let gameStatus = useAppSelector(selectCurrentGameStatus);

  // currentGame not set
  if (!gameStatus) return <Loading />;
  // currentGame finished
  if (gameStatus === "finished") return <Redirect to={`/game/${name}/score`} />;

  // lazy load game only when needed
  // ideally would combine with react-lazy-with-preload
  // and preload while user on start screen
  let GameEngine = renderGameEngine(name);

  return (
    <GameFramework>
      {gameStatus === "new" ? (
        <>
          <StartScreen />
        </>
      ) : (
        <>
          <Suspense fallback={<Spin />}>
            <GameEngine />
          </Suspense>
        </>
      )}
    </GameFramework>
  );
}
