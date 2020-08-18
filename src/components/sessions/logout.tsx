import React, { FC } from "react";

import { dispatchType } from "../../container/sessions/logout_container";

type propsType = dispatchType;

const Logout: FC<propsType> = ({ logout }) => {
  return (
    <button
      onClick={() => {
        logout();
      }}
    >
      ok
    </button>
  );
};

export default Logout;
