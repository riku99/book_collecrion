import { Reducer } from "redux";

import { getBooksType } from "./actions/books_action";

export type initialState = {
  serchedBooks:
    | { title: string; authors: string[] | null; image: string | null }[]
    | null;
  message: { error?: string; success?: string; info?: string } | null;
};

type ActionType = getBooksType;

const reducer: Reducer<initialState, ActionType> = (
  state = {
    serchedBooks: null,
    message: null,
  },
  action
): initialState => {
  switch (action.type) {
    case "SUCCESS_GET_BOOK": {
      return { ...state, message: null, serchedBooks: action.data };
    }

    case "FAILER_GET_BOOK": {
      return { ...state, message: action.message };
    }

    default: {
      return { ...state };
    }
  }
};

export default reducer;
