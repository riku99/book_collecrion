import React, { FC } from "react";

import { dispatchType } from "../../container/sessions/logout_container";

type propsType = dispatchType & { style: Object } & {
  onClick: Function | null;
};

const Logout: FC<propsType> = ({ logout, style, onClick }) => {
  return (
    <button
      style={style}
      onClick={() => {
        const r = window.confirm("ログアウトしますか?");
        if (r) {
          logout();
          if (onClick) {
            onClick();
          }
        }
      }}
    >
      ログアウト
    </button>
  );
};

export default Logout;
