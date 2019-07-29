import { put, all, call, takeLatest } from "redux-saga/effects";
import ServiceUser from "../../services/user";

import { ActionTypes } from "../actions";

function* updateUser(action) {
  try {
    yield call(ServiceUser.updateUser, action.payload.credentials);

    yield put({
      type: ActionTypes.UPDATE_USER.SUCCESS
    });
  } catch (err) {
    yield put({
      type: ActionTypes.UPDATE_USER.FAILURE,
      payload: { text: err.message }
    });
  }
}

function* signUser(action) {
  try {
    yield call(ServiceUser.signUser, action.payload.credentials);

    yield put({
      type: ActionTypes.SIGN.SUCCESS
    });
  } catch (err) {
    yield put({
      type: ActionTypes.SIGN.FAILURE,
      payload: { text: err.message }
    });
  }
}

function* getUserList(action) {
  try {
    const response = yield call(ServiceUser.getUsers, action.payload);

    yield put({
      type: ActionTypes.USER.SUCCESS,
      payload: { userList: response.users }
    });
  } catch (err) {
    yield put({
      type: ActionTypes.USER.FAILURE,
      payload: { text: err.message }
    });
  }
}

function* watchAddTodo() {
  yield takeLatest(ActionTypes.USER.REQUEST, getUserList);
  yield takeLatest(ActionTypes.SIGN.REQUEST, signUser);
  yield takeLatest(ActionTypes.UPDATE_USER.REQUEST, updateUser);
}

export default function* userRoot() {
  yield all([watchAddTodo()]);
}
