import { EntityState } from "@reduxjs/toolkit";

// define interfaces - GameInfo, GameSettings, CurrentGameState, GameState
export interface GameInfo {
  id: string;
  urlId: string;
  name: string;
  intro_text: string;
  farewell_text: string;
  time: 120;
}
export interface GameSettings {
  audio: boolean;
}
export interface CurrentGameState {
  id: string; //note this is name not id
  gameStatus: "new" | "started" | "finished";
  timeLeft: number; //necessary with redux-persist; otherwise refresh sets time
  score: number;
  error: string | undefined;
  uploadStatus: "idle" | "uploading" | "successful" | "failed";
}
export type GamesState = EntityState<GameInfo> & {
  status: "new" | "loading" | "failed" | "successful";
  error: string | undefined;
  settings: GameSettings;
  currentGame?: CurrentGameState;
};
