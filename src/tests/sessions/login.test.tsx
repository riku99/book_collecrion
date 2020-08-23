import React from "react";
import { render, fireEvent } from "../test-utils";
import "@testing-library/jest-dom/extend-expect";
import { createStore } from "redux";
import reducer from "../../reducer";

import Login from "../../container/sessions/login_container";

describe("<Login />", async () => {
  test("ユーザー名を入力できる", async () => {
    const { findByTestId } = render(<Login />);
    const usernameForm = await findByTestId("username-form");
    expect(usernameForm).toHaveValue("");
    fireEvent.change(usernameForm, { target: { value: "riku" } });
    expect(usernameForm).toHaveValue("riku");
  });

  test("パスワードを入力できる", async () => {
    const { findByTestId } = render(<Login />);
    const passwordForm = await findByTestId("password-form");
    expect(passwordForm).toHaveValue("");
    fireEvent.change(passwordForm, { target: { value: "foobar" } });
    expect(passwordForm).toHaveValue("foobar");
  });

  test("確認用パスワードを入力できる", async () => {
    const { findByTestId } = render(<Login />);
    const confirmationForm = await findByTestId("password-confirmation-form");
    expect(confirmationForm).toHaveValue("");
    fireEvent.change(confirmationForm, { target: { value: "foobar" } });
    expect(confirmationForm).toHaveValue("foobar");
  });

  test("エラーメッセージが表示される", async () => {
    const { findByTestId } = render(<Login />, {
      testInitialState: { message: { error: "ユーザーが存在しません" } },
    });
    const errorMessage = await findByTestId("error-message");
    expect(errorMessage).toHaveTextContent("ユーザーが存在しません");
  });

  test("ログインボタンを押すとdispatchされる", async () => {
    const store = createStore(reducer);
    store.dispatch = jest.fn();
    const { findByTestId } = render(<Login />, { store: store });
    const loginButton = await findByTestId("login-button");
    fireEvent.click(loginButton);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "CREATE_LOGIN",
      payload: {
        user: { username: "", password: "", password_confirmation: "" },
      },
    });
  });
});
