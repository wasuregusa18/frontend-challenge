import React, { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { finishGame, uploadScore } from "../gamesSlice";

interface GameEngineWrapperProps {
  children: React.ReactNode;
}

export function GameEngineWrapper({ children }: GameEngineWrapperProps) {
  const dispatch = useAppDispatch();
  // finish and upload game
  // if they leave after starting
  useEffect(() => {
    return () => {
      dispatch(finishGame());
      dispatch(uploadScore());
    };
  }, [dispatch]);
  return <>{children}</>;
}
