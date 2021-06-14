import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";
import "./App.css";

import { GameSelector } from "./features/games/GameSelector";
import { Game } from "./features/games/Game";

interface MatchParams {
  name: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={GameSelector} />
        <Route
          path="/game/:name"
          render={({ match }: MatchProps) => <Game name={match.params.name} />}
        />
        <Route>
          <Redirect to={"/"} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
