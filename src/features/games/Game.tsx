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
import { selectGameById, setCurrentGame } from "./gamesSlice";
import { GameContent } from "./GameContent";
import { GameIntro } from "./GameIntro";
import { GameScore } from "./GameScore";

// adds some unncessary complexity
// brittle - assumes game names capitalized
// but allows users to navigate to game by url
const url2name = (url: string): string =>
  url.replace(/-/gi, " ").replace(/\b\w/g, (l) => l.toUpperCase());

interface GameProps {
  name: string;
}

export function Game({ name }: GameProps) {
  const dispatch = useAppDispatch();
  const gameId = url2name(name);
  const currentGame = useAppSelector((state) => selectGameById(state, gameId));
  if (!currentGame) return <p>Game Not Found</p>;
  dispatch(setCurrentGame(gameId));

  return (
    <Router>
      <Switch>
        <Route path={`/game/${name}/intro`}>
          <GameIntro name={name} />
        </Route>
        <Route path={`/game/${name}/play`}>
          <GameContent />
        </Route>
        <Route path={`/game/${name}/score`}>
          <GameScore name={name} />
        </Route>
        <Route>
          <Redirect to={`/game/${name}/intro`} />
        </Route>
      </Switch>
    </Router>
  );
}
