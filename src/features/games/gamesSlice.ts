import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { fetchGames, uploadScore } from "./gamesAPI";
import {
  GameInfo,
  GameSettings,
  CurrentGameState,
  GamesState,
} from "./gamesSlice.types";
import { name2url } from "../../helper";

export const gamesAdapter = createEntityAdapter<GameInfo>({
  // using name based id so that can read currentGame from url
  // see fetchGames.fulfilled
  selectId: (game) => game.urlId,
  // sort alphabetically
  // could also compare by popularity or most recently used
  sortComparer: (a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0),
});

// inital state
const initialSettings: GameSettings = { audio: true };
export const makeNewGame = (id: string, time: number): CurrentGameState => ({
  id,
  gameStatus: "new",
  score: 0,
  timeLeft: time,
  error: undefined,
  uploadStatus: "idle",
});
export const initialState: GamesState = gamesAdapter.getInitialState({
  status: "new",
  error: undefined,
  settings: initialSettings,
});

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setCurrentGame: (state, action: PayloadAction<string>) => {
      const gameId = action.payload;
      if (gameId in state.entities) {
        const time = state.entities[gameId]!.time;
        state.currentGame = makeNewGame(gameId, time);
      }
    },
    incrementScore: (state) => {
      if (state.currentGame != null) {
        if (state.currentGame.score) state.currentGame.score += 1;
        else state.currentGame.score = 1;
      }
    },
    updateTime: (state, action: PayloadAction<number>) => {
      if (state.currentGame != null) {
        state.currentGame.timeLeft = action.payload;
      }
    },
    startGame: (state) => {
      if (state.currentGame != null) {
        state.currentGame.gameStatus = "started";
        state.currentGame.score = 0;
      }
    },
    finishGame: (state) => {
      if (state.currentGame != null) {
        state.currentGame.gameStatus = "finished";
      }
    },
    resetGame: (state) => {
      if (state.currentGame != null) {
        const gameId = state.currentGame.id;
        if (gameId in state.entities) {
          const time = state.entities[gameId]!.time;
          state.currentGame = makeNewGame(gameId, time);
        }
      }
    },
    toggleAudio: (state) => {
      state.settings.audio = !state.settings.audio;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = "successful";
        let processedGames = action.payload.map((game) => ({
          urlId: name2url(game.name),
          ...game,
        }));
        // gamesAdapter.removeAll(state); // when want to reset state
        gamesAdapter.setAll(state, processedGames);
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(uploadScore.pending, (state) => {
        if (state.currentGame != null)
          state.currentGame.uploadStatus = "uploading";
      })
      .addCase(uploadScore.fulfilled, (state, action) => {
        if (state.currentGame != null)
          state.currentGame.uploadStatus = "successful";
      })
      .addCase(uploadScore.rejected, (state, action) => {
        if (state.currentGame != null) {
          state.currentGame.uploadStatus = "failed";
          state.currentGame.error = action.error.message;
        }
      });
  },
});

export const {
  setCurrentGame,
  incrementScore,
  updateTime,
  startGame,
  finishGame,
  resetGame,
  toggleAudio,
} = gamesSlice.actions;

export default gamesSlice.reducer;
