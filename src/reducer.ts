import { Reducer } from "redux";

import { booksType } from "./actions/books_action";
import { RedirectStateType } from "./actions/redirect_action";
import { usersActionType } from "./actions/users_action";

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
  redirectToNewPage: boolean;
};

type ActionType = booksType | RedirectStateType | usersActionType;

const reducer: Reducer<initialState, ActionType> = (
  state = {
    serchedBooks: null,
    myBooks: null,
    myBook: null,
    message: null,
    redirectToNewPage: false,
  },
  action
): initialState => {
  switch (action.type) {
    case "SUCCESS_NEW_USER": {
      return { ...state, message: action.message, redirectToNewPage: true };
    }

    case "SUCCESS_GET_BOOK": {
      return { ...state, message: null, serchedBooks: action.data };
    }

    case "SUCCESS_GET_MYBOOKS": {
      return {
        ...state,
        myBooks: action.mybooks,
        message: null,
      };
    }

    case "SUCCESS_GETMYBOOK": {
      return { ...state, myBook: action.mybook, message: null };
    }

    case "SUCCESS_DELETE_MYBOOK": {
      return { ...state, redirectToNewPage: true, message: action.message };
    }

    case "SUCCESS_MESSAGE": {
      return { ...state, message: action.message };
    }

    case "FAILER_MESSAGE": {
      return { ...state, message: action.message };
    }

    case "CAHNGE_REDIRECT_STATE": {
      return { ...state, redirectToNewPage: false, message: null };
    }

    default: {
      return { ...state };
    }
  }
};

export default reducer;
