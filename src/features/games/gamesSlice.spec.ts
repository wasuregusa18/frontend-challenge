import { store } from "../../app/store";
import {
  incrementScore,
  makeNewGame,
  setCurrentGame,
  finishGame,
} from "./gamesSlice";

// just test some reducers here
// see userSlice.spec.ts for async test

test("setCurrentGame test", () => {
  let state = store.getState().games;
  const currentGame = state?.currentGame;
  expect(currentGame).toBeFalsy(); //starts undefined

  const newGame = makeNewGame("1");
  store.dispatch(setCurrentGame("1"));
  state = store.getState().games;
  const newCurrentGame = state?.currentGame;
  expect(newCurrentGame).toEqual(newGame);
});

test("incrementScore test", () => {
  let state = store.getState().games;
  const originalScore = state?.currentGame?.score;
  expect(originalScore).toBeFalsy(); //starts undefined

  store.dispatch(setCurrentGame("1"));
  state = store.getState().games;
  const initalizedScore = state?.currentGame?.score;
  expect(initalizedScore).toEqual(0);

  store.dispatch(incrementScore());
  state = store.getState().games;
  let incrementedScore = state?.currentGame?.score;
  expect(incrementedScore).toEqual(1);
});

test("finishGame test", () => {
  let state = store.getState().games;
  //   const originalStatus = state?.currentGame?.gameStatus;
  //   expect(originalStatus).toBeFalsy(); //starts undefined

  store.dispatch(setCurrentGame("1"));
  const initalizedStatus = state?.currentGame?.gameStatus;
  expect(initalizedStatus).toEqual("new");

  store.dispatch(finishGame());
  state = store.getState().games;
  const finishedStatus = state?.currentGame?.gameStatus;
  expect(finishedStatus).toEqual("finished");
});
