import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expect from "expect";

import { UserState, fetchUser, UserInfo } from "./userSlice";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("user reducer", () => {
  let initialState: UserState = {
    status: "new",
    error: null,
  };

  it("should handle fetch", async () => {
    const fakeUser: UserInfo = {
      id: "fake-id123",
      name: "John Smith",
      email: "john.smith@gmail.com",
    };
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve(fakeUser) } as Response)
      );

    const expectedActions = [
      { type: "user/fetchUser/pending" },
      { type: "user/fetchUser/fulfilled", payload: fakeUser },
    ];
    const store = mockStore(initialState);

    await store.dispatch<any>(fetchUser());
    let [act1, act2] = store.getActions();
    expect(act1.type).toEqual(expectedActions[0].type);
    expect(act2.type).toEqual(expectedActions[1].type);
    expect(act2.payload).toEqual(fakeUser);
  });

  it("should handle failed fetch", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.reject("mock error"));

    const expectedActions = [
      { type: "user/fetchUser/pending" },
      { type: "user/fetchUser/rejected", error: { message: "mock error" } },
    ];
    const store = mockStore(initialState);

    await store.dispatch<any>(fetchUser());
    let [act1, act2] = store.getActions();
    expect(act1.type).toEqual(expectedActions[0].type);
    expect(act2.type).toEqual(expectedActions[1].type);
    expect(act2.error.message).toEqual(expectedActions[1].error?.message);
    expect(act2.error.message).toEqual(expectedActions[1].error?.message);
  });
});
