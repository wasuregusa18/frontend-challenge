import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";

interface GameInfo {
  id: string;
  name: string;
  intro_text: string;
  farewell_text: string;
  time: 120;
}

interface GameSettings {
  audio: boolean;
}

interface CurrentGameState {
  id: string; //note this is name not id
  gameStatus: "new" | "started" | "finished";
  score: number | undefined;
  error: string | undefined;
  uploadStatus: "idle" | "uploading" | "successful" | "failed";
}

type GamesState = EntityState<GameInfo> & {
  status: "new" | "loading" | "failed" | "successful";
  error: string | undefined;
  settings: GameSettings;
  currentGame?: CurrentGameState;
};

const initialSettings: GameSettings = { audio: true };
const makeNewGame = (id: string): CurrentGameState => ({
  id,
  gameStatus: "new",
  score: undefined,
  error: undefined,
  uploadStatus: "idle",
});

const gamesAdapter = createEntityAdapter<GameInfo>({
  // using name as id tag - so that can set current game from url
  // alternatively could use a lookup table - name2id
  selectId: (game) => game.name,
  // could also compare by popularity or most recently used
  sortComparer: (a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0),
});

const baseUrlEndpoint =
  "https://virtserver.swaggerhub.com/selfdecode.com/game-challenge/1.0.0/";
export const fetchGames = createAsyncThunk("games/fetchGames", async () => {
  const response = await fetch(baseUrlEndpoint + "game/");
  return (await response.json()) as Array<GameInfo>;
});

interface scorePayload {
  user_id: string;
  score: number;
  game_id: string;
}
type scoreEntry = scorePayload & { id: string };
export const uploadScore = createAsyncThunk<
  scoreEntry | undefined,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("games/uploadScore", async (gameId, { getState, dispatch }) => {
  const state: RootState = getState();
  const user_id = state.user.info.id;
  const score = selectScore(state);
  const game_id = selectGameById(state, gameId)?.id;

  if (!(user_id && score && game_id)) {
    dispatch(failUpload());
  } else {
    let payload: scorePayload = {
      user_id,
      score,
      game_id,
    };
    const response = await fetch(baseUrlEndpoint + "score/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return (await response.json()) as scoreEntry;
  }
});

const initialState: GamesState = gamesAdapter.getInitialState({
  status: "new",
  error: undefined,
  settings: initialSettings,
});

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setCurrentGame: (state, action: PayloadAction<string>) => {
      state.currentGame = makeNewGame(action.payload);
    },
    setScore: (state, action: PayloadAction<number>) => {
      if (state.currentGame != null) state.currentGame.score = action.payload;
    },
    startGame: (state) => {
      if (state.currentGame != null) state.currentGame.gameStatus = "started";
    },
    finishGame: (state) => {
      if (state.currentGame != null) state.currentGame.gameStatus = "finished";
    },
    failUpload: (state) => {
      if (state.currentGame != null) {
        state.currentGame.uploadStatus = "failed";
        state.currentGame.error = "Game_id, User_id or Score is not valid";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = "successful";
        gamesAdapter.upsertMany(state, action.payload);
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

export const { setCurrentGame, setScore, startGame, finishGame, failUpload } =
  gamesSlice.actions;

export const selectScore = (state: RootState): number | undefined =>
  state.games.currentGame?.score;

export const {
  selectAll: selectAllGames,
  selectById: selectGameById,
  selectIds: selectGameIds,
} = gamesAdapter.getSelectors((state: RootState) => state.games);

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

export default gamesSlice.reducer;
