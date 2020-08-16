export const newUser = {
  new: (username: string, password: string, confirmation: string) => ({
    type: "NEW_USER",
    payload: {
      user: {
        username: username,
        password: password,
        password_confirmation: confirmation,
      },
    },
  }),
  success: (user: Object) => ({
    type: "SUCCESS_NEW_USER" as const,
    user: user,
    message: { success: "登録しました" },
  }),
  error: (e: string) => ({ type: "FAILER_MESSAGE", message: { error: e } }),
};

export type usersActionType = ReturnType<typeof newUser.success>;
