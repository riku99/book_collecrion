import { takeLatest, put, call } from "redux-saga/effects";

import { getCurrentUser } from "../apis/sessions_api";
import { currentUser } from "../actions/sessions_action";
import { login, logout } from "../actions/sessions_action";
import { createLogin, doLogout } from "../apis/sessions_api";

function* runGetCurrentUser() {
  const response = yield getCurrentUser();
  let user;
  if ((user = response.data.current_user)) {
    yield put(currentUser.success(user));
  } else {
    yield put(currentUser.none());
  }
}

function* runCteateLogin(action: ReturnType<typeof login.create>) {
  try {
    const response = yield call(createLogin, action.payload);
    yield put(login.success(response));
  } catch (e) {
    yield put(login.error(e.message));
  }
}

function* runDoLogout() {
  try {
    yield doLogout();
    yield put(logout.success());
  } catch (e) {
    console.log(e.message);
  }
}

export function* watchGetCurrentUser() {
  yield takeLatest("GET_CURRENT_USER", runGetCurrentUser);
}

export function* watchCreateLogin() {
  yield takeLatest("CREATE_LOGIN", runCteateLogin);
}

export function* watchDoLogout() {
  yield takeLatest("DO_LOGOUT", runDoLogout);
}
