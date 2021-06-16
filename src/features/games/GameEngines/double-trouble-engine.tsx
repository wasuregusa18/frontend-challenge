import React, { useMemo, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { incrementScore, selectAudioSettings } from "../gamesSlice";
import { Button, Col, Row } from "antd";
import "./double-trouble-engine.css";
import { useUploadOnDismount } from "./useUploadOnDismount";
import { playAudio } from "../helper";

const BLUE = "rgb(0,116,255)";
const RED = "rgb(255,0,0)";
const colorsText = ["BLUE", "RED"];
const colorsRGB = [BLUE, RED];
interface problemProps {
  rand1: 0 | 1;
  rand2: 0 | 1;
}
type answerProps = problemProps & { checkAnswer: (e: any) => void };

const randOneorTwo = () => (Math.random() >= 0.5 ? 1 : 0);
const buildRandomProps = (): problemProps => ({
  rand1: randOneorTwo(),
  rand2: randOneorTwo(),
});
const invertRandomProps = ({ rand1, rand2 }: problemProps): problemProps => ({
  rand1: ((rand1 + 1) % 2) as 0 | 1,
  rand2: ((rand2 + 1) % 2) as 0 | 1,
});
const random2colors = ({ rand1, rand2 }: problemProps) => [
  colorsText[rand1],
  colorsRGB[rand2],
];

const AnswerButton = ({ rand1, rand2, checkAnswer }: answerProps) => {
  const [text, color] = random2colors({ rand1, rand2 });
  return (
    <Button
      className="answer-button"
      onClick={checkAnswer}
      size="large"
      shape="round"
      style={{ color: color }}
    >
      {text}
    </Button>
  );
};

const Problem = ({ rand1, rand2 }: problemProps) => {
  const [text, color] = random2colors({ rand1, rand2 });
  return (
    <p className="problem-text" style={{ color: color }}>
      {text}
    </p>
  );
};

export default function DoubleTrouble() {
  useUploadOnDismount();
  // here I use to force rerender
  // but useful to give accuracy stat also
  const [numQ, setNumQ] = useState(0);
  const hasBeenClicked = useRef(false);

  // audio
  let isAudioOn = useAppSelector(selectAudioSettings);
  const success = new Audio("/success.mp3");
  const failure = new Audio("/failure.mp3");

  const dispatch = useAppDispatch();

  // prevents question changing when user switches audio
  const problem = useMemo<problemProps>(() => buildRandomProps(), [numQ]);
  const answer1 = useMemo<problemProps>(() => buildRandomProps(), [numQ]);
  const answer2 = invertRandomProps(answer1);

  // use wasRight data attribute with button focus
  // to flash success or failure
  // adds significant complexity
  const checkAnswer = (e: any) => {
    // prevent multiple clicks
    if (hasBeenClicked.current) return;
    hasBeenClicked.current = true;

    const answerIndex = colorsText.findIndex((c) => c === e.target.innerText);
    const wasCorrect = answerIndex === problem.rand2;
    if (wasCorrect) {
      dispatch(incrementScore());
      isAudioOn && playAudio(success);
      e.target.setAttribute("wasRight", 1);
    } else {
      isAudioOn && playAudio(failure);
      e.target.setAttribute("wasRight", 0);
    }

    setTimeout(() => {
      // otherwise clicked button stuck on focus state
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      setTimeout(() => {
        setNumQ((prevVal) => ++prevVal);
        hasBeenClicked.current = false;
      }, 100);
    }, 400);
  };

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
          <AnswerButton checkAnswer={checkAnswer} {...answer1} />
        </Col>
        <Col>
          <AnswerButton checkAnswer={checkAnswer} {...answer2} />
        </Col>
      </Row>
    </div>
  );
}

// export default GameEngineWrapper({ children: DoubleTrouble });
