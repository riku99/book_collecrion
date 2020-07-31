import { put, takeLatest, call } from "redux-saga/effects";

import { getBooks, registerBooks, getMyBooks } from "../actions/books_action";
import {
  getGoogleBooksApi,
  registerBookToRailsApi,
  getMyBooksToRailsApi,
} from "../apis/books_apis";

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

function* runRegisterBook(action: ReturnType<typeof registerBooks.register>) {
  try {
    yield call(registerBookToRailsApi, action.data);
  } catch (e) {}
}

export function* watchRegisterBook() {
  yield takeLatest("REGISTER_BOOKS", runRegisterBook);
}

function* runGetMyBooks() {
  try {
    let data = yield call(getMyBooksToRailsApi);
    yield put(getMyBooks.success(data));
  } catch (e) {
    console.log(e.message);
  }
}

export function* watchGetMyBooks() {
  yield takeLatest("GET_MYBOOKS", runGetMyBooks);
}
