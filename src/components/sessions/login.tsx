import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";

import {
  stateType,
  dispatchType,
} from "../../container/sessions/login_container";
import "./login.css";

type propsType = dispatchType & stateType & RouteComponentProps;

const Login: FC<propsType> = ({
  history,
  message,
  redirectToNewPage,
  login,
  changeRedirectState,
}) => {
  const [username, changeUsername] = useState("");
  const [password, changePassword] = useState("");
  const [password_confirmation, changeConfirmation] = useState("");

  useEffect(() => {
    if (redirectToNewPage) {
      history.replace("/books");
      changeRedirectState();
    }
  });

  return (
    <>
      {message && message.error ? (
        <div className="error-message" data-testid="error-message">
          {message.error}
        </div>
      ) : null}
      <div className="login">
        <div className="form">
          <input
            className="login-form"
            type="text"
            placeholder="ユーザ名"
            value={username}
            onChange={(e) => {
              changeUsername(e.target.value);
            }}
            data-testid="username-form"
          />
          <input
            className="login-form"
            type="password"
            placeholder="6文字以上のパスワード"
            value={password}
            onChange={(e) => {
              changePassword(e.target.value);
            }}
            data-testid="password-form"
          />
          <input
            className="login-form"
            type="password"
            placeholder="パスワードの確認"
            value={password_confirmation}
            onChange={(e) => {
              changeConfirmation(e.target.value);
            }}
            data-testid="password-confirmation-form"
          />
          <button
            className="login-button"
            onClick={() => {
              login(username, password, password_confirmation);
            }}
            data-testid="login-button"
          >
            ログイン
          </button>
        </div>
      </div>
      <div className="for-new-user">
        アカウントをお持ちでないですか?<Link to="/users/new">登録する</Link>
      </div>
    </>
  );
};

export default withRouter(Login);
