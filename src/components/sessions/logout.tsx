import React, { FC } from "react";

import { dispatchType } from "../../container/sessions/logout_container";

type propsType = dispatchType & { style: Object };

const Logout: FC<propsType> = ({ logout, style }) => {
  return (
    <button
      style={style}
      onClick={() => {
        const r = window.confirm("ログアウトしますか?");
        if (r) {
          logout();
        }
      }}
    >
      ログアウト
    </button>
  );
};

export default Logout;
