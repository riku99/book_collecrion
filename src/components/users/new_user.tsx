import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { stateType } from "../../container/users/new_user_container";
import { dispatchType } from "../../container/users/new_user_container";

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
      history.replace("/");
      changeRedirectState();
    }
  }, [redirectToNewPage, history, changeRedirectState]);

  return (
    <>
      {message ? <div>{message.error}</div> : null}
      <form>
        <input
          type="text"
          value={username}
          placeholder="ユーザ名"
          onChange={(e) => {
            changeUsername(e.target.value);
          }}
          data-testid="username-form"
        />
        <input
          type="password"
          value={password}
          placeholder="6文字以上のパスワード"
          onChange={(e) => {
            changePassword(e.target.value);
          }}
          data-testid="password-form"
        />
        <input
          type="password"
          value={password_confirmation}
          placeholder="パスワードの確認"
          onChange={(e) => {
            changeConfirmation(e.target.value);
          }}
          data-testid="password-confirmation-form"
        />
      </form>
      <button
        onClick={() => newUser(username, password, password_confirmation)}
        data-testid="new-button"
      >
        登録する
      </button>
    </>
  );
};

export default withRouter(NewUser);
