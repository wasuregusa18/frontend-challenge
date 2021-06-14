import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface UserInfo {
  id: string | undefined;
  name: string | undefined;
  email: string | undefined;
}

export interface UserState {
  info?: UserInfo;
  status: "new" | "loading" | "failed" | "successful";
  error: string | null | undefined;
}

const initialState: UserState = {
  status: "new",
  error: null,
};

// design decision
// allow anoynomous users to play games
// save their records under anoynomous id
const anoynomousUser: UserInfo = {
  id: "anoynomous",
  name: "Stranger",
  email: undefined,
};

const urlEndpoint =
  "https://virtserver.swaggerhub.com/selfdecode.com/game-challenge/1.0.0/user/";
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await fetch(urlEndpoint);
  return (await response.json()) as UserInfo;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "successful";
        state.info = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.info = anoynomousUser;
      });
  },
});

export const selectUser = (state: RootState): UserState => state.user;
export const selectUserID = (state: RootState): string | undefined =>
  state.user?.info?.id;

export default userSlice.reducer;
