import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import { playAudio } from "../../../helper";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { incrementScore } from "../gamesSlice";
import { selectAudioSettings } from "../gamesSliceSelectors";

const BLUE = "rgb(0,116,255)";
const RED = "rgb(255,0,0)";
const colorsText = ["BLUE", "RED"];
const colorsRGB = [BLUE, RED];

const random2colors = ({ rand1, rand2 }: problemProps) => [
  colorsText[rand1],
  colorsRGB[rand2],
];

export interface problemProps {
  rand1: 0 | 1;
  rand2: 0 | 1;
}

export const Problem = ({ rand1, rand2 }: problemProps) => {
  const [text, color] = random2colors({ rand1, rand2 });
  return (
    <p className="problem-text" style={{ color: color }}>
      {text}
    </p>
  );
};

type answerProps = problemProps & {
  // checkAnswer: (e: any) => void;
  setNumQ: React.Dispatch<React.SetStateAction<number>>;
  isCorrect: boolean;
  audio: HTMLAudioElement;
  hasBeenClicked: React.MutableRefObject<boolean>;
};

// set delay higher to prevent continuous clicking being optimium strategy
const delay = 300;

export const AnswerButton = ({
  rand1,
  rand2,
  audio,
  setNumQ,
  isCorrect,
  hasBeenClicked,
}: answerProps) => {
  const dispatch = useAppDispatch();
  let isAudioOn = useAppSelector(selectAudioSettings);
  const [wasClicked, setClicked] = useState(false);
  const [text, color] = random2colors({ rand1, rand2 });
  let timeoutRef = useRef<NodeJS.Timeout>();

  const toDisplay = isCorrect ? (
    <CheckIcon className="feedback-icon" />
  ) : (
    <ClearIcon className="feedback-icon" />
  );

  // load next question after short delay
  useEffect(() => {
    if (wasClicked) {
      timeoutRef.current = setTimeout(() => {
        setNumQ((preVal) => ++preVal);
        hasBeenClicked.current = false;
      }, delay);
    }
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [wasClicked, setNumQ, hasBeenClicked]);

  return (
    <Button
      className={
        !wasClicked ? "answer-button" : "answer-button feedback-button"
      }
      onClick={(e) => {
        if (!hasBeenClicked.current) {
          isAudioOn && playAudio(audio);
          setClicked(true);
          isCorrect && dispatch(incrementScore());
          hasBeenClicked.current = true;
        }
        // otherwise keeps focus
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }}
      size="large"
      shape="round"
      style={{ color: color }}
    >
      {!wasClicked ? text : toDisplay}
    </Button>
  );
};
