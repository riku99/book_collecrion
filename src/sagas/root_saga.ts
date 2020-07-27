import { all } from "redux-saga/effects";

import { watchGetBooks } from "./books_saga";

export default function* rootSaga() {
  yield all([watchGetBooks()]);
}
