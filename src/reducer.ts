import { Reducer } from "redux";

import { booksType } from "./actions/books_action";

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
  myBook: {
    id: number;
    title: string;
    authors: string;
    image: string;
    memo: string;
    date: string;
  } | null;
  message: { error?: string; success?: string; info?: string } | null;
};

type ActionType = booksType;

const reducer: Reducer<initialState, ActionType> = (
  state = {
    serchedBooks: null,
    myBooks: null,
    myBook: null,
    message: null,
  },
  action
): initialState => {
  switch (action.type) {
    case "SUCCESS_GET_BOOK": {
      return { ...state, message: null, serchedBooks: action.data };
    }

    case "SUCCESS_GET_MYBOOKS": {
      return {
        ...state,
        myBooks: action.mybooks,
      };
    }

    case "SUCCESS_MESSAGE": {
      return { ...state, message: action.message };
    }

    case "FAILER_MESSAGE": {
      return { ...state, message: action.message };
    }

    case "SUCCESS_GETMYBOOK": {
      return { ...state, myBook: action.mybook };
    }

    default: {
      return { ...state };
    }
  }
};

export default reducer;
