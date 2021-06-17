import { render, RenderResult, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { Timebar } from "./Timebar";
import { RootState } from "../../app/store";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import { fakeInitialState, fakeStartedState } from "../../app/fakeStates";

const middlewares = [thunk];
const mockStore = configureMockStore<RootState>(middlewares);

const renderTimebar = (store: MockStoreEnhanced<RootState>): RenderResult => {
  return render(
    <Provider store={store}>
      <Timebar />
    </Provider>
  );
};

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test("Renders Timebar", () => {
  let store = mockStore(fakeInitialState);
  renderTimebar(store);
  jest.advanceTimersByTime(5000);
  expect(screen.getByText("120")).toHaveTextContent("120");
});

test(" Timebar counts down", () => {
  let store = mockStore(fakeStartedState);
  renderTimebar(store);
  jest.advanceTimersByTime(5000);
  expect(screen.getByText("115")).toHaveTextContent("115");
});

test(" Timebar finishes game", () => {
  let store = mockStore(fakeStartedState);
  renderTimebar(store);
  jest.advanceTimersByTime(1000 * 130);
  let [action] = store.getActions();
  expect(action.type).toEqual("games/finishGame");
});
