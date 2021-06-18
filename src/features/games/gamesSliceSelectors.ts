import { RootState } from "../../app/store";
import { GameInfo } from "./gamesSlice.types";
import { gamesAdapter } from "./gamesSlice";

export const {
  selectAll: selectAllGames,
  selectById: selectGameById,
  selectIds: selectGameIds,
} = gamesAdapter.getSelectors((state: RootState) => state.games);

export const selectScore = (state: RootState): number | undefined =>
  state.games.currentGame?.score;

export const selectCurrentGameInfo = (
  state: RootState
): GameInfo | undefined => {
  let currentGame = state.games.currentGame?.id;
  if (currentGame) return selectGameById(state, currentGame);
};

export const selectCurrentGameIntro = (
  state: RootState
): string | undefined => {
  let currentGame = state.games.currentGame?.id;
  if (currentGame) return selectGameById(state, currentGame)?.intro_text;
};

export const selectCurrentGameEnd = (state: RootState): string | undefined => {
  let currentGame = state.games.currentGame?.id;
  if (currentGame) return selectGameById(state, currentGame)?.farewell_text;
};

export const selectCurrentGameStatus = (state: RootState) =>
  state.games.currentGame?.gameStatus;

export const selectAudioSettings = (state: RootState) =>
  state.games.settings.audio;

export const selectCurrentGameTime = (state: RootState): number | undefined => {
  let currentGame = state.games.currentGame?.id;
  if (currentGame) return selectGameById(state, currentGame)?.time;
};
