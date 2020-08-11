import React from "react";
import { render, fireEvent } from "../test-utils";
import "@testing-library/jest-dom/extend-expect";
import { createStore } from "redux";
import reducer from "../../reducer";

import NewUser from "../../container/users/new_user_container";

describe("<NewUser />", () => {
  test("ユーザー名を入力できる", async () => {
    const { findByTestId } = render(<NewUser />);
    const usernameForm = await findByTestId("username-form");
    expect(usernameForm).toHaveValue("");
    fireEvent.change(usernameForm, { target: { value: "riku" } });
    expect(usernameForm).toHaveValue("riku");
  });

  test("パスワードを入力できる", async () => {
    const { findByTestId } = render(<NewUser />);
    const passwordForm = await findByTestId("password-form");
    expect(passwordForm).toHaveValue("");
    fireEvent.change(passwordForm, { target: { value: "foobar" } });
    expect(passwordForm).toHaveValue("foobar");
  });

  test("確認用パスワードを入力できる", async () => {
    const { findByTestId } = render(<NewUser />);
    const passwordConfirmationForm = await findByTestId(
      "password-confirmation-form"
    );
    expect(passwordConfirmationForm).toHaveValue("");
    fireEvent.change(passwordConfirmationForm, { target: { value: "foobar" } });
    expect(passwordConfirmationForm).toHaveValue("foobar");
  });

  test("登録ボタンを押すとdispatchされる", async () => {
    const store = createStore(reducer);
    store.dispatch = jest.fn();
    const { findByTestId } = render(<NewUser />, { store: store });
    const newButton = await findByTestId("new-button");
    fireEvent.click(newButton);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "NEW_USER",
      payload: {
        user: { username: "", password: "", password_confirmation: "" },
      },
    });
  });
});
