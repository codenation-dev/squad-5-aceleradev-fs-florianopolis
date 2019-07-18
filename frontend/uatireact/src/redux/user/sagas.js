import { put, all, call, takeLatest } from "redux-saga/effects";
import ServiceLogin from "../../services/login";

import { ActionTypes } from "../actions";

function* attemptToLogin(action) {
  if (
    action.payload.credentials.username === "test" &&
    action.payload.credentials.password === "test"
  ) {
    try {
      const response = yield call(ServiceLogin.tryLogin, action.payload);

      const loggedUser = {
        username: action.payload.credentials.username,
        password: action.payload.credentials.password,
        token: response.data.hello
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
      yield put({
        type: ActionTypes.FAILURE_ATTEMPT_LOGIN,
        payload: { text: err }
      });
    }
  } else {
    console.log("FAILURE ON ATTEMPTING LOGIN");
    yield put({
      type: ActionTypes.FAILURE_ATTEMPT_LOGIN,
      payload: { text: "Erro ao efetuar login" }
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
