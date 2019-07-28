import { put, all, call, takeLatest } from "redux-saga/effects";
import ServiceLogin from "../../services/login";

import { ActionTypes } from "../actions";

function* attemptToLogin(action) {
  try {
    const obj = JSON.stringify({
      email: action.payload.credentials.email,
      password: action.payload.credentials.password
    });
    const response = yield call(ServiceLogin.tryLogin, obj);
    console.log(response);
    if (!response["token"]) {
      throw new Error(response.message);
    }
    
    const loggedUser = {
      // name: obj.name,
      name: response.name,
      email: action.payload.credentials.email,
      super: response.super_user,
      token: response.token
    };

    loggedUser.email !== ""
    ? localStorage.setItem("userEmail", loggedUser.email)
    : localStorage.removeItem("userEmail");

    loggedUser.token !== ""
    ? localStorage.setItem("userToken", loggedUser.token)
    : localStorage.removeItem("userToken");
    
    loggedUser.name !== ""
    ? localStorage.setItem("userName", loggedUser.name)
    : localStorage.removeItem("userName");

    loggedUser.super === true
    ? localStorage.setItem("userSuper", loggedUser.super)
    : localStorage.removeItem("userSuper");
    

    yield put({
      type: ActionTypes.LOGIN.SUCCESS,
      payload: { loggedUser }
    });
  } catch (err) {
    console.log("FAILURE ON ATTEMPTING LOGIN");
    console.log(err);
    yield put({
      type: ActionTypes.LOGIN.FAILURE,
      payload: { text: err.message }
    });
  }
}

function* watchAddTodo() {
  yield takeLatest(ActionTypes.LOGIN.REQUEST, attemptToLogin);
}

export default function* userRoot() {
  yield all([watchAddTodo()]);
}
