import { all } from "redux-saga/effects";

import {
  watchGetBooks,
  watchRegisterBook,
  watchGetMyBooks,
  watchGetMyBook,
  watchDeleteMyBook,
} from "./books_saga";
import { watchNewUser } from "./users_saga";
import {
  watchGetCurrentUser,
  watchCreateLogin,
  watchDoLogout,
} from "./sessions_saga";

export default function* rootSaga() {
  yield all([
    watchGetBooks(),
    watchRegisterBook(),
    watchGetMyBooks(),
    watchGetMyBook(),
    watchDeleteMyBook(),
    watchNewUser(),
    watchGetCurrentUser(),
    watchCreateLogin(),
    watchDoLogout(),
  ]);
}
