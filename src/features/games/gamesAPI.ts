import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";
import { GameInfo } from "./gameSlice.types";
import { baseUrlEndpoint } from "../../helper";
import {
  selectScore,
  selectCurrentGameDatabaseID,
} from "./gamesSliceSelectors";

type APIGameInfo = Omit<GameInfo, "urlId">;

export const fetchGames = createAsyncThunk("games/fetchGames", async () => {
  const response = await fetch(baseUrlEndpoint + "game/");
  return (await response.json()) as Array<APIGameInfo>;
});
interface scorePayload {
  user_id: string;
  score: number;
  game_id: string;
}
type scoreEntry = scorePayload & { id: string };
export const uploadScore = createAsyncThunk<
  scoreEntry,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("games/uploadScore", async (_, { getState }) => {
  const state: RootState = getState();
  const user_id = state.user?.info?.id;
  const score = selectScore(state);
  const game_id = selectCurrentGameDatabaseID(state);

  if (!(user_id && game_id && typeof score === "number")) {
    throw new Error(
      `Invalid playload: game_id=${game_id}, user_id=${user_id}, score=${score}`
    );
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
