import { put, all, call, takeLatest } from "redux-saga/effects";
import ServiceUser from "../../services/user";

import { ActionTypes } from "../actions";

function* signUser(action) {
  try {
    const response = yield call(
      ServiceUser.signUser,
      action.payload.credentials
    );

    console.log(response);

    yield put({
      type: ActionTypes.SIGN.SUCCESS
    });
  } catch (err) {
    console.log("FAILURE ON sign USERS");
    console.log(err);

    yield put({
      type: ActionTypes.SIGN.FAILURE,
      payload: { text: err.message }
    });
  }
}
function* getUserList(action) {
  try {
    const response = yield call(ServiceUser.getUsers, action.payload);
    
    console.log(response);

    yield put({
      type: ActionTypes.USER.SUCCESS,
      payload: { userList: response.users }
    });
  } catch (err) {
    console.log("FAILURE ON ATTEMPTING USERS");
    console.log(err);

    yield put({
      type: ActionTypes.USER.FAILURE,
      payload: { text: err.message }
    });
  }
}

function* watchAddTodo() {
  yield takeLatest(ActionTypes.USER.REQUEST, getUserList);
  yield takeLatest(ActionTypes.SIGN.REQUEST, signUser);
  // yield takeLatest('REQUEST_CHARACTER_DETAIL', getCharactersDetail);
}

export default function* userRoot() {
  yield all([watchAddTodo()]);
}
