import React, { Suspense, useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCurrentGameIntro, resetGame } from "./gamesSlice";
import { Button, Spin } from "antd";
import { Container } from "@material-ui/core";
import "./GameIntro.css";

function renderGameIntro(name: string) {
  return React.lazy(() => import("./GameIntros/" + name + "-intro"));
}
interface GameInfoProps {
  name: string;
}

export function GameIntro({ name }: GameInfoProps) {
  let introText = useAppSelector(selectCurrentGameIntro);
  let GameIntro = renderGameIntro(name);

  return (
    <Container maxWidth="md" className="intro-container">
      <h2 className="instruction-header">Instructions</h2>
      <p className="instruction-text">{introText}</p>
      <Suspense
        fallback={
          <div className="intro-loading">
            <Spin />
          </div>
        }
      >
        <GameIntro />
      </Suspense>
      <div className="understand-button-wrapper">
        <Link to={`play`}>
          <Button size="large" shape="round" className="understand-button">
            I understand
          </Button>
        </Link>
      </div>
    </Container>
  );
}
