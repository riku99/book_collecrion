import { Reducer } from "redux";

import { booksType } from "./actions/books_action";
import { RedirectStateType } from "./actions/redirect_action";
import { usersActionType } from "./actions/users_action";
import { sessionsActionType } from "./actions/sessions_action";
import { messagesActionType } from "./actions/messages_action";

export type initialState = {
  login: {
    logged_in: boolean;
    current_user: Object | null;
    checked: boolean;
  };
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

export const defaultState = {
  login: { logged_in: false, current_user: null, checked: false },
  serchedBooks: null,
  myBooks: null,
  myBook: null,
  message: null,
  redirectToNewPage: false,
};

type ActionType =
  | booksType
  | RedirectStateType
  | usersActionType
  | sessionsActionType
  | messagesActionType;

const reducer: Reducer<initialState, ActionType> = (
  state = defaultState,
  action
): initialState => {
  switch (action.type) {
    case "SUCCESS_NEW_USER": {
      return {
        ...state,
        login: { logged_in: true, current_user: action.user, checked: true },
        message: action.message,
        redirectToNewPage: true,
      };
    }

    case "SUCCESS_LOGIN": {
      return {
        ...state,
        login: {
          logged_in: true,
          current_user: action.current_user,
          checked: true,
        },
        redirectToNewPage: true,
        message: { success: "ログインしました" },
      };
    }

    case "SUCCESS_LOGOUT": {
      return defaultState;
    }

    case "SUCCESS_CURRENT_USER": {
      return {
        ...state,
        login: {
          logged_in: true,
          current_user: action.current_user,
          checked: true,
        },
      };
    }

    case "NONE_CURRENT_USER": {
      return {
        ...state,
        login: { logged_in: false, current_user: null, checked: true },
      };
    }

    case "SUCCESS_GET_BOOK": {
      return { ...state, serchedBooks: action.data };
    }

    case "SUCCESS_GET_MYBOOKS": {
      return {
        ...state,
        myBooks: action.mybooks,
      };
    }

    case "SUCCESS_GETMYBOOK": {
      return { ...state, myBook: action.mybook };
    }

    case "SUCCESS_DELETE_MYBOOK": {
      return { ...state, redirectToNewPage: true, message: action.message };
    }

    case "SUCCESS_MESSAGE": {
      return { ...state, message: action.message };
    }

    case "DELETE_SUCCESS_MESSAGE": {
      return {
        ...state,
        message: {
          error: state.message?.error,
          success: undefined,
          info: state.message?.info,
        },
      };
    }

    case "FAILER_MESSAGE": {
      return { ...state, message: action.message };
    }

    case "CAHNGE_REDIRECT_STATE": {
      return { ...state, redirectToNewPage: false };
    }

    default: {
      return { ...state };
    }
  }
};

export default reducer;
