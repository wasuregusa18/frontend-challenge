import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectAllGames } from "./gamesSlice";
import { selectUser } from "../user/userSlice";
import { Link } from "react-router-dom";

const name2url = (name: string): string =>
  name.replace(/ /gi, "-").toLowerCase();

export function GameSelector() {
  const { status, error, info: userInfo } = useAppSelector(selectUser);
  const games = useAppSelector(selectAllGames);

  // need loading screen until call for user resolved
  return (
    <>
      <h3>Hello {userInfo?.name}</h3>
      {games.map((game) => (
        <div>
          <Link to={`game/${name2url(game.name)}/`}>{game.name}</Link>
        </div>
      ))}
    </>
  );
}
