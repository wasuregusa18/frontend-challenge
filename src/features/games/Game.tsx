import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectGameById,
  setCurrentGame,
  selectCurrentGameInfo,
} from "./gamesSlice";
import { GameContent } from "./GameContent";
import { GameIntro } from "./GameIntro";
import { GameScore } from "./GameScore";
import { RootState } from "../../app/store";
import { Loading } from "./Loading";
import { useTitle } from "./useTitle";

// adds some unncessary complexity
// brittle - assumes game names capitalized (could make lower before adding to store)
// but allows users to navigate to game by url
const url2name = (url: string): string =>
  url.replace(/-/gi, " ").replace(/\b\w/g, (l) => l.toUpperCase());

interface GameProps {
  name: string;
}

export function Game({ name }: GameProps) {
  const dispatch = useAppDispatch();
  const gameId = url2name(name);
  const gamesStatus = useAppSelector((state: RootState) => state.games.status);
  const currentGameinStore = useAppSelector(selectCurrentGameInfo);
  const currentGamefromUrl = useAppSelector((state: RootState) =>
    selectGameById(state, gameId)
  );
  useTitle(gameId);
  if (gamesStatus === "loading") return <Loading />;
  else if (!currentGamefromUrl) return <Redirect to="/" />;
  else if (currentGamefromUrl !== currentGameinStore) {
    dispatch(setCurrentGame(gameId));
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
        <GameScore name={name} />
      </Route>
      <Route>
        <Redirect to={`/game/${name}/intro`} />
      </Route>
    </Switch>
  );
}
