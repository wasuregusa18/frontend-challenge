import React from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { toggleAudio } from "../gamesSlice";
import { selectAudioSettings } from "../gamesSliceSelectors";
import VolumeUpRoundedIcon from "@material-ui/icons/VolumeUpRounded";
import VolumeOffRoundedIcon from "@material-ui/icons/VolumeOffRounded";
import "./Audio.css";

export function Audio() {
  let isAudioOn = useAppSelector(selectAudioSettings);
  let dispatch = useAppDispatch();

  return (
    <div className="audio-container" onClick={() => dispatch(toggleAudio())}>
      <div className={isAudioOn ? "icon-wrapper" : "icon-wrapper-off"}>
        {isAudioOn ? (
          <VolumeUpRoundedIcon className="audio-icon" />
        ) : (
          <VolumeOffRoundedIcon className="audio-icon" />
        )}
      </div>
    </div>
  );
}
