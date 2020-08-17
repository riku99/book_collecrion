import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";

import { stateType } from "../../container/users/new_user_container";
import { dispatchType } from "../../container/users/new_user_container";
import "./new_user.css";

type propsType = dispatchType & stateType & RouteComponentProps;

const NewUser: FC<propsType> = ({
  history,
  message,
  redirectToNewPage,
  newUser,
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
      {message ? <div className="error-message">{message.error}</div> : null}
      <div className="new-user">
        <div className="form">
          <input
            className="new-user-form"
            type="text"
            value={username}
            placeholder="ユーザ名"
            onChange={(e) => {
              changeUsername(e.target.value);
            }}
            data-testid="username-form"
          />
          <input
            className="new-user-form"
            type="password"
            value={password}
            placeholder="6文字以上のパスワード"
            onChange={(e) => {
              changePassword(e.target.value);
            }}
            data-testid="password-form"
          />
          <input
            className="new-user-form"
            type="password"
            value={password_confirmation}
            placeholder="パスワードの確認"
            onChange={(e) => {
              changeConfirmation(e.target.value);
            }}
            data-testid="password-confirmation-form"
          />

          <button
            className="new-user-button"
            onClick={() => newUser(username, password, password_confirmation)}
            data-testid="new-button"
          >
            登録する
          </button>
        </div>
      </div>
      <div className="for-login">
        アカウントをお持ちですか?<Link to="/login">ログインする</Link>
      </div>
    </>
  );
};

export default withRouter(NewUser);
