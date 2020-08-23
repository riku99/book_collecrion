import reducer from "../../reducer";
import { defaultState } from "../../reducer";

describe("reducer_for_sessions", () => {
  test("SUCCESS_CURRENT_USER", () => {
    const action = {
      type: "SUCCESS_CURRENT_USER" as const,
      current_user: { current_user: "test_user" },
    };
    expect(reducer(defaultState, action)).toEqual({
      ...defaultState,
      login: {
        logged_in: true,
        current_user: action.current_user,
        checked: true,
      },
    });
  });

  test("NONE_CURRENT_USER", () => {
    const action = {
      type: "NONE_CURRENT_USER" as const,
    };
    expect(reducer(defaultState, action)).toEqual({
      ...defaultState,
      login: { logged_in: false, current_user: null, checked: true },
    });
  });

  test("SUCCESS_LOGIN", () => {
    const action = {
      type: "SUCCESS_LOGIN" as const,
      current_user: { current_user: "test_user" },
    };
    expect(reducer(defaultState, action)).toEqual({
      ...defaultState,
      login: {
        logged_in: true,
        current_user: action.current_user,
        checked: true,
      },
      redirectToNewPage: true,
      message: { success: "ログインしました" },
    });
  });

  test("SUCCESS_LOGOUT", () => {
    const action = {
      type: "SUCCESS_LOGOUT" as const,
    };
    expect(reducer(defaultState, action)).toEqual(defaultState);
  });
});
