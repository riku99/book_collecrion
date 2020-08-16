import { takeLatest, call, put } from "redux-saga/effects";

import { newUser } from "../actions/users_action";
import { newUserApi } from "../apis/users_api";

function* runNewUser(action: ReturnType<typeof newUser.new>) {
  try {
    const data = yield call(newUserApi, action.payload);
    yield put(newUser.success(data.user));
  } catch (e) {
    yield put(newUser.error(e.message));
  }
}

export function* watchNewUser() {
  yield takeLatest("NEW_USER", runNewUser);
}
