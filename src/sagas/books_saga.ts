import { put, takeLatest, call } from "redux-saga/effects";

import {
  getBooks,
  registerBooks,
  getMyBooks,
  getMyBook,
  deleteMyBook,
} from "../actions/books_action";
import {
  getGoogleBooksApi,
  registerBookToRailsApi,
  getMyBooksToRailsApi,
  getMyBookFromRailsApi,
  deleteMyBookToRailsApi,
} from "../apis/books_api";

function* runGetBooks(action: ReturnType<typeof getBooks.get>) {
  try {
    let books_data = yield call(getGoogleBooksApi, action.keyword);
    yield put(getBooks.success(books_data));
  } catch (e) {
    console.log(e.message);
    yield put(getBooks.error(e.message));
  }
}

function* runRegisterBook(action: ReturnType<typeof registerBooks.register>) {
  try {
    yield call(registerBookToRailsApi, action.data);
    yield put(registerBooks.success("MyBooksを登録しました"));
  } catch (e) {
    yield put(registerBooks.error(e.message));
  }
}

function* runGetMyBooks() {
  try {
    let data = yield call(getMyBooksToRailsApi);
    yield put(getMyBooks.success(data));
  } catch (e) {
    yield put(getMyBooks.error(e.message));
  }
}

function* runGetMyBook(action: ReturnType<typeof getMyBook.get>) {
  try {
    let response = yield getMyBookFromRailsApi(action.id);
    yield put(getMyBook.success(response));
  } catch (e) {
    yield put(getMyBook.error(e.message));
  }
}

function* runDeleteMyBook(action: ReturnType<typeof deleteMyBook.delete>) {
  try {
    yield call(deleteMyBookToRailsApi, action.id);
    yield put(deleteMyBook.success("削除しました"));
  } catch (e) {
    yield put(deleteMyBook.error(e.message));
  }
}

export function* watchGetBooks() {
  yield takeLatest("GET_BOOKS", runGetBooks);
}

export function* watchRegisterBook() {
  yield takeLatest("REGISTER_BOOKS", runRegisterBook);
}

export function* watchGetMyBooks() {
  yield takeLatest("GET_MYBOOKS", runGetMyBooks);
}

export function* watchGetMyBook() {
  yield takeLatest("GET_MYBOOK", runGetMyBook);
}

export function* watchDeleteMyBook() {
  yield takeLatest("DELETE_MYBOOK", runDeleteMyBook);
}
