export const changeRedirectState = {
  toFalse: () => ({ type: "CAHNGE_REDIRECT_STATE" as const }),
};

export type RedirectStateType = ReturnType<typeof changeRedirectState.toFalse>;
