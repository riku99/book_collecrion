import { put, takeLatest, call } from "redux-saga/effects";

import { getBooks } from "../actions/books_action";
import { getGoogleBooksApi } from "../apis/books_apis";

function* runGetBook(action: ReturnType<typeof getBooks.get>) {
  try {
    let books_data = yield call(getGoogleBooksApi, action.keyword);
    yield put(getBooks.success(books_data));
  } catch (e) {
    console.log(e.message);
    yield put(getBooks.error({ error: e.message }));
  }
}

export function* watchGetBooks() {
  yield takeLatest("GET_BOOKS", runGetBook);
}
