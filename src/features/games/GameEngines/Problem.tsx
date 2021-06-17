import React from "react";
import { problemProps, random2colors } from "./AnswerButton";

export const Problem = ({ rand1, rand2 }: problemProps) => {
  const [text, color] = random2colors({ rand1, rand2 });
  return (
    <p className="problem-text" style={{ color: color }}>
      {text}
    </p>
  );
};
