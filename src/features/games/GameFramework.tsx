import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCurrentGameStatus, startGame, finishGame } from "./gamesSlice";
import { Row, Col } from "antd";

import { Timebar } from "./Timebar";
import { ScoreKeeper } from "./ScoreKeeper";
import { Audio } from "./Audio";

interface GameFrameworkProps {
  children: React.ReactNode;
}

export function GameFramework({ children }: GameFrameworkProps) {
  let content;
  return (
    <>
      <Row>
        <Col>{children}</Col>
        <Col>
          <Row>
            <Timebar />
          </Row>
          <Row>
            <ScoreKeeper />
          </Row>
          <Row>
            <Audio />
          </Row>
        </Col>
      </Row>
    </>
  );
}
