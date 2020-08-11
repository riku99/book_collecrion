import reducer from "../../reducer";

import { defaultState } from "./reducer.test";

describe("ruducer_for_users", () => {
  test("SUCCESS_NEW_USER", () => {
    const action = {
      type: "SUCCESS_NEW_USER" as const,
      message: { success: "登録しました" },
    };
    expect(reducer(defaultState, action)).toEqual({
      ...defaultState,
      message: { success: "登録しました" },
      redirectToNewPage: true,
    });
  });
});
