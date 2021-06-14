import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectAudioSettings, toggleAudio } from "./gamesSlice";
import VolumeUpRoundedIcon from "@material-ui/icons/VolumeUpRounded";
import VolumeOffRoundedIcon from "@material-ui/icons/VolumeOffRounded";

export function Audio() {
  let isAudioOn = useAppSelector(selectAudioSettings);
  let dispatch = useAppDispatch();

  return (
    <div onClick={() => dispatch(toggleAudio())}>
      {isAudioOn ? <VolumeUpRoundedIcon /> : <VolumeOffRoundedIcon />}
    </div>
  );
}
