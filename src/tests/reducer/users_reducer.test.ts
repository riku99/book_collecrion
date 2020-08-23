import reducer from "../../reducer";
import { defaultState } from "../../reducer";

describe("ruducer_for_users", () => {
  test("SUCCESS_NEW_USER", () => {
    const action = {
      type: "SUCCESS_NEW_USER" as const,
      user: { current_user: "sample_user" },
      message: { success: "登録しました" },
    };
    expect(reducer(defaultState, action)).toEqual({
      ...defaultState,
      login: { logged_in: true, current_user: action.user, checked: true },
      message: { success: "登録しました" },
      redirectToNewPage: true,
    });
  });
});
