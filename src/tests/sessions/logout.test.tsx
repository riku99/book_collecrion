import React from "react";
import { render, fireEvent } from "../test-utils";
import "@testing-library/jest-dom/extend-expect";
import { createStore } from "redux";
import reducer from "../../reducer";

import Logout from "../../container/sessions/logout_container";

describe("<Logout />", () => {
  test("ログアウトボタンを押すとdispatchされる", async () => {
    const store = createStore(reducer);
    store.dispatch = jest.fn();
    const { findByTestId } = render(<Logout />, { store: store });
    window.confirm = jest.fn(() => true);
    const logoutButton = await findByTestId("logout-button");
    fireEvent.click(logoutButton);
    expect(store.dispatch).toHaveBeenCalledWith({ type: "DO_LOGOUT" });
  });

  test("onClickが渡されるとそれが実行される", async () => {
    const onClick = jest.fn();
    const stroe = createStore(reducer);
    stroe.dispatch = jest.fn();
    const { findByTestId } = render(<Logout onClick={onClick} />);
    window.confirm = jest.fn(() => true);
    const logoutButton = await findByTestId("logout-button");
    fireEvent.click(logoutButton);
    expect(onClick).toBeCalledTimes(1);
  });
});
