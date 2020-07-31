import { Reducer } from "redux";

import { getBooksType, getMyBooksType } from "./actions/books_action";

export type initialState = {
  serchedBooks:
    | { title: string; authors: string[] | null; image: string | null }[]
    | null;
  myBooks:
    | {
        id: number;
        title: string;
        authors: string;
        image: string | null;
        memo: string;
        date: string;
      }[]
    | null;
  message: { error?: string; success?: string; info?: string } | null;
};

type ActionType = getBooksType | getMyBooksType;

const reducer: Reducer<initialState, ActionType> = (
  state = {
    serchedBooks: null,
    myBooks: null,
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

    case "SUCCESS_GET_MYBOOKS": {
      return {
        ...state,
        myBooks: action.mybooks,
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default reducer;
