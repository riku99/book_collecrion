export const currentUser = {
  get: () => ({ type: "GET_CURRENT_USER" as const }),
  success: (user: Object) => ({
    type: "SUCCESS_CURRENT_USER" as const,
    current_user: user,
  }),
  none: () => ({ type: "NONE_CURRENT_USER" as const }),
};

export const login = {
  create: (
    username: string,
    password: string,
    password_confirmation: string
  ) => ({
    type: "CREATE_LOGIN",
    payload: {
      user: {
        username: username,
        password: password,
        password_confirmation: password_confirmation,
      },
    },
  }),
  success: (current_user: { current_user: Object }) => ({
    type: "SUCCESS_LOGIN" as const,
    current_user: current_user,
  }),
  error: (message: string) => ({
    type: "FAILER_MESSAGE" as const,
    message: { error: message },
  }),
};

export const logout = {
  do: () => ({ type: "DO_LOGOUT" }),
  success: () => ({ type: "SUCCESS_LOGOUT" as const }),
};

export type sessionsActionType =
  | ReturnType<typeof currentUser.success>
  | ReturnType<typeof currentUser.none>
  | ReturnType<typeof login.success>
  | ReturnType<typeof logout.success>;
