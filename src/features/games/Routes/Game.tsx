import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { setCurrentGame } from "../gamesSlice";
import { selectGameById, selectCurrentGameInfo } from "../gamesSliceSelectors";
import { GameContent } from "./GameContent";
import { GameIntro } from "./GameIntro";
import { GameScore } from "./GameScore";
import { RootState } from "../../../app/store";
import { Loading } from "./Loading";
import { useTitle } from "../hooks/useTitle";

interface GameProps {
  name: string;
}

export function Game({ name }: GameProps) {
  const dispatch = useAppDispatch();
  const gamesStatus = useAppSelector((state: RootState) => state.games.status);
  const currentGameinStore = useAppSelector(selectCurrentGameInfo);
  const currentGamefromUrl = useAppSelector((state: RootState) =>
    selectGameById(state, name)
  );
  let title = currentGamefromUrl ? currentGamefromUrl.name : "Game Not Found";
  useTitle(title);
  if (gamesStatus === "loading") return <Loading />;
  else if (!currentGamefromUrl) return <Redirect to="/" />;
  else if (currentGamefromUrl !== currentGameinStore) {
    dispatch(setCurrentGame(name));
  }

  return (
    <Switch>
      <Route path={`/game/${name}/intro`}>
        <GameIntro name={name} />
      </Route>
      <Route path={`/game/${name}/play`}>
        <GameContent name={name} />
      </Route>
      <Route path={`/game/${name}/score`}>
        <GameScore />
      </Route>
      <Route>
        <Redirect to={`/game/${name}/intro`} />
      </Route>
    </Switch>
  );
}
