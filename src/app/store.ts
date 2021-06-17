import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import gamesSlice from "../features/games/gamesSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    games: gamesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
