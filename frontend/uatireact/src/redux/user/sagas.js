import { put, all, call, takeLatest } from "redux-saga/effects";
import ServiceUser from "../../services/user";

import { ActionTypes } from "../actions";

function* getUserList(action) {
  try {
    const response = yield call(ServiceUser.getUsers, action.payload);
    console.log(response);
    yield put({
      type: ActionTypes.SUCCESS_ATTEMPT_USER,
      payload: {}
    });
  } catch (err) {
    console.log("FAILURE ON ATTEMPTING USERS");
    console.log(err);
    yield put({
      type: ActionTypes.FAILURE_ATTEMPT_USER,
      payload: { text: err.message }
    });
  }
}

function* watchAddTodo() {
  yield takeLatest(ActionTypes.REQUEST_ATTEMPT_USER, getUserList);
  // yield takeLatest('REQUEST_CHARACTER_DETAIL', getCharactersDetail);
}

export default function* userRoot() {
  yield all([watchAddTodo()]);
}
