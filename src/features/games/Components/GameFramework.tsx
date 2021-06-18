import React from "react";
import { Row, Col } from "antd";

import { Timebar } from "./Timebar";
import { ScoreKeeper } from "./ScoreKeeper";
import { Audio } from "./Audio";

import "./GameFramework.css";

interface GameFrameworkProps {
  children: React.ReactNode;
}

export function GameFramework({ children }: GameFrameworkProps) {
  return (
    <Row style={{ height: "100vh" }}>
      <Col span={18}>{children}</Col>
      <Col span={6}>
        <Row className="timebar-row" justify="center">
          <Timebar />
        </Row>
        <Row justify="center" className="score-row">
          <ScoreKeeper />
        </Row>
        <Row justify="center" className="audio-row">
          <Audio />
        </Row>
      </Col>
    </Row>
    // </Container>
  );
}
