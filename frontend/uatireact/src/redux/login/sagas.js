import { put, all, call, takeLatest } from "redux-saga/effects";
import ServiceLogin from "../../services/login";

import { ActionTypes } from "../actions";

function* attemptToLogin(action) {
  try {
    const obj = JSON.stringify({
      email: action.payload.credentials.username,
      password: action.payload.credentials.password
    });
    const response = yield call(ServiceLogin.tryLogin, obj);

    if (!response["token"]) {
      throw new Error(response.message);
    }

    const loggedUser = {
      username: obj.email,
      password: obj.password,
      token: response.token
    };

    loggedUser.token !== ""
      ? localStorage.setItem("userToken", loggedUser.token)
      : localStorage.setItem("userToken", "");

    yield put({
      type: ActionTypes.SUCCESS_ATTEMPT_LOGIN,
      payload: { loggedUser }
    });
  } catch (err) {
    console.log("FAILURE ON ATTEMPTING LOGIN");
    console.log(err);
    yield put({
      type: ActionTypes.FAILURE_ATTEMPT_LOGIN,
      payload: { text: err.message }
    });
  }
}

function* watchAddTodo() {
  yield takeLatest(ActionTypes.REQUEST_ATTEMPT_LOGIN, attemptToLogin);
  // yield takeLatest('REQUEST_CHARACTER_DETAIL', getCharactersDetail);
}

export default function* userRoot() {
  yield all([watchAddTodo()]);
}
