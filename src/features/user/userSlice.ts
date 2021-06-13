import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { RootState} from '../../app/store';

interface UserInfo {
  id: string | null
name: string | null
email: string | null
}

export interface UserState {
  info: UserInfo
  status: 'new' | 'loading' | 'failed' | "successful"
  error: string | null | undefined
}

const initialState: UserState = {
  info: {id: null,
      name: null,
      email: null},
  status: "new",
  error: null
};

// design decision
// allow anoynomous users to play games
// save their records under anoynomous id
const anoynomousUser: UserInfo = {
  id: "anoynomous",
  name: "Stranger",
  email: null
}

const urlEndpoint = "https://virtserver.swaggerhub.com/selfdecode.com/game-challenge/1.0.0/user/"
export const fetchPosts = createAsyncThunk('user/fetchUser', async () => {
    const  response = await fetch(urlEndpoint)
    return await response.json() as UserInfo
  })


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'successful';
        state.info = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message
        state.info = anoynomousUser
      });
  },
});


// export const selectUserInfo = (state: RootState) => state.user.info;
// export const selectUserStatus = (state: RootState) => state.user.info;

export default userSlice.reducer;
