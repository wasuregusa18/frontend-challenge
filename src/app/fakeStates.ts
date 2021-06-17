import { RootState } from "./store";

const fakeLoadingState: RootState = {
  user: {
    status: "new",
    error: null,
  },
  games: {
    ids: [],
    entities: {},
    status: "loading",
    error: undefined,
    settings: {
      audio: true,
    },
  },
};

const fakeNoCurrentGameState: RootState = {
  user: {
    status: "successful",
    error: null,
    info: {
      id: "f7bbbdd9-5a55-4a32-b53e-b5b74b4d24b4",
      name: "John Doe",
      email: "john@selfdecode.com",
    },
  },
  games: {
    ids: ["Double Trouble"],
    entities: {
      "Double Trouble": {
        id: "c77f35e3-d41c-446c-af63-80f430a962d0",
        name: "Double Trouble",
        intro_text:
          "See what color the top word is. Select that color from the two options below. DON’T pay attention to what the top word says or the color of the two options below. It’s important to match the color of the top word with the meaning of the word below.",
        farewell_text:
          "We will reach you as soon as we carefully review your interview.",
        time: 120,
      },
    },
    status: "successful",
    error: undefined,
    settings: {
      audio: true,
    },
  },
};

let fakeInitialState: RootState = JSON.parse(
  JSON.stringify(fakeNoCurrentGameState)
);
fakeInitialState.games.currentGame = {
  id: "Double Trouble",
  gameStatus: "started",
  score: 0,
  uploadStatus: "idle",
  error: undefined,
};

let fakeStartedState: RootState = JSON.parse(JSON.stringify(fakeInitialState));
fakeStartedState.games.currentGame!.gameStatus = "started";

export {
  fakeLoadingState,
  fakeNoCurrentGameState,
  fakeInitialState,
  fakeStartedState,
};
