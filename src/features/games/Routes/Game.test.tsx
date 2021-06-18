import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route } from "react-router-dom";
import { Game } from "./Game";
import { RootState } from "../../../app/store";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import {
  fakeLoadingState,
  fakeNoCurrentGameState,
  fakeInitialState,
} from "../../../app/fakeStates";

const middlewares = [thunk];
const mockStore = configureMockStore<RootState>(middlewares);

const renderGame = (
  store: MockStoreEnhanced<RootState>,
  name = "double-trouble"
): RenderResult => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Game name={name} />
        <Route>
          <div>Home</div>
        </Route>
      </MemoryRouter>
    </Provider>
  );
};

test("Loading Game shows Loading Page", () => {
  let store = mockStore(fakeLoadingState);
  renderGame(store);
  expect(screen.getByTitle(/loading page/i)).toBeInTheDocument();
});

test("Redirect to GameSelector on bad name", () => {
  let store = mockStore(fakeInitialState);
  renderGame(store, "fake-name");
  expect(screen.getByText("Home")).toBeInTheDocument();
});

test("Set Current Game", () => {
  let store = mockStore(fakeNoCurrentGameState);
  renderGame(store);
  let [action] = store.getActions();
  expect(action.type).toEqual("games/setCurrentGame");
  expect(action.payload).toEqual("double-trouble");
});

test("Correctly Routes", () => {
  let store = mockStore(fakeInitialState);
  renderGame(store);
  // should go to intro
  expect(screen.getByText(/instructions/i)).toBeInTheDocument();

  //   should go to start page
  fireEvent.click(screen.getByText(/i understand/i));
  expect(screen.getByText(/start the game/i)).toBeInTheDocument();
});
