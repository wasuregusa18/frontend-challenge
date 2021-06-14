import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { incrementScore } from "../gamesSlice";

const colors = ["blue", "red"];
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

const AnswerButton = ({ rand1, rand2, checkAnswer }: answerProps) => {
  let text = colors[rand1];
  let color = colors[rand2];
  console.log("rerendered answer");
  return (
    <button onClick={checkAnswer} style={{ color: color }}>
      {text}
    </button>
  );
};

const Problem = ({ rand1, rand2 }: problemProps) => {
  let text = colors[rand1];
  let color = colors[rand2];
  console.log("rerendered problem");
  return <p style={{ color: color }}>{text}</p>;
};

export default function DoubleTrouble() {
  // here I used to force rerender
  // but useful to give accuracy stat also
  const [numQ, setNumQ] = useState(0);
  const dispatch = useAppDispatch();

  const problem = buildRandomProps();
  const answer1 = buildRandomProps();
  const answer2 = invertRandomProps(answer1);

  const checkAnswer = (e: any) => {
    if (e.target.innerHTML === colors[problem.rand2]) {
      dispatch(incrementScore());
    }
    setNumQ((prevVal) => ++prevVal);
  };

  return (
    <div key={Math.random()}>
      <Problem {...problem} />
      <AnswerButton checkAnswer={checkAnswer} {...answer1} />
      <AnswerButton checkAnswer={checkAnswer} {...answer2} />
    </div>
  );
}
