import React, { useMemo, useRef, useState } from "react";
import { Col, Row } from "antd";
import "./double-trouble-engine.css";
import { useUploadOnDismount } from "../hooks/useUploadOnDismount";
import { AnswerButton, Problem, problemProps } from "./AnswerButton";

const randOneorTwo = () => (Math.random() >= 0.5 ? 1 : 0);
const buildRandomProps = (): problemProps => ({
  rand1: randOneorTwo(),
  rand2: randOneorTwo(),
});
const invertRandomProps = ({ rand1, rand2 }: problemProps): problemProps => ({
  rand1: ((rand1 + 1) % 2) as 0 | 1,
  rand2: ((rand2 + 1) % 2) as 0 | 1,
});

export default function DoubleTrouble() {
  useUploadOnDismount();
  // here I use to force rerender
  // but useful to give accuracy stat also
  const [numQ, setNumQ] = useState(0);
  // prevent double+triple clicking
  const hasBeenClicked = useRef(false);

  // audio
  const success = new Audio("/success.mp3");
  const failure = new Audio("/failure.mp3");

  // prevents question changing when rerendered for any reason but ++numQ
  // eslint-disable-next-line
  const problem = useMemo<problemProps>(() => buildRandomProps(), [numQ]);
  // eslint-disable-next-line
  const answer1 = useMemo<problemProps>(() => buildRandomProps(), [numQ]);
  const answer2 = invertRandomProps(answer1);
  const isCorrect = problem.rand2 === answer1.rand1;

  return (
    <div>
      <Row
        align="bottom"
        gutter={[0, 500]}
        justify="center"
        style={{ height: "45vh" }}
      >
        <Col>
          <Problem {...problem} />
        </Col>
      </Row>
      <Row style={{ height: "10vh" }} />
      <Row align="top" justify="center" gutter={50} style={{ height: "45vh" }}>
        <Col>
          <AnswerButton
            key={numQ}
            isCorrect={isCorrect}
            audio={isCorrect ? success : failure}
            hasBeenClicked={hasBeenClicked}
            setNumQ={setNumQ}
            {...answer1}
          />
        </Col>
        <Col>
          <AnswerButton
            key={-numQ - 1}
            isCorrect={!isCorrect}
            audio={!isCorrect ? success : failure}
            hasBeenClicked={hasBeenClicked}
            setNumQ={setNumQ}
            {...answer2}
          />
        </Col>
      </Row>
    </div>
  );
}
