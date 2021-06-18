import reducer, { initialState } from "./gamesSlice";
import {
  fakeInitialState,
  fakeNoCurrentGameState,
  fakeStartedState,
} from "../../app/fakeStates";

// just test reducer
// see userSlice.spec.ts for async test

describe("games reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle setCurrentGame", () => {
    expect(
      reducer(fakeNoCurrentGameState.games, {
        type: "games/setCurrentGame",
        payload: "double-trouble",
      })
    ).toEqual(fakeInitialState.games);
  });

  it("should handle incrementScore", () => {
    expect(
      reducer(fakeInitialState.games, {
        type: "games/incrementScore",
      })?.currentGame?.score
    ).toEqual(1);
  });

  it("should handle updateTime", () => {
    expect(
      reducer(fakeInitialState.games, {
        type: "games/updateTime",
        payload: 54,
      })?.currentGame?.timeLeft
    ).toEqual(54);
  });

  it("should handle startGame", () => {
    expect(
      reducer(fakeInitialState.games, {
        type: "games/startGame",
      })?.currentGame?.gameStatus
    ).toEqual("started");
  });

  it("should handle finishGame", () => {
    expect(
      reducer(fakeInitialState.games, {
        type: "games/finishGame",
      })?.currentGame?.gameStatus
    ).toEqual("finished");
  });

  it("should handle resetGame", () => {
    expect(
      reducer(fakeStartedState.games, {
        type: "games/resetGame",
      })
    ).toEqual(fakeInitialState.games);
  });

  it("should handle toggleAudio", () => {
    expect(
      reducer(fakeInitialState.games, {
        type: "games/toggleAudio",
      }).settings.audio
    ).toEqual(false);
  });
});
