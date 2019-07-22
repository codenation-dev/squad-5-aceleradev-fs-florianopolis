import { put, all, call, takeLatest } from "redux-saga/effects";
import ServiceNotification from "../../services/notification";

import { ActionTypes } from "../actions";

function* getNotificationList(action) {
  try {
    const response = yield call(
      ServiceNotification.getNotifications,
      action.payload
    );
    console.log(response);
    yield put({
      type: ActionTypes.SUCCESS_ATTEMPT_NOTIFICATION,
      payload: {}
    });
  } catch (err) {
    console.log("FAILURE ON ATTEMPTING NOTIFICATIONS");
    console.log(err);
    yield put({
      type: ActionTypes.FAILURE_ATTEMPT_NOTIFICATION,
      payload: { text: err.message }
    });
  }
}

function* watchAddTodo() {
  yield takeLatest(
    ActionTypes.REQUEST_ATTEMPT_NOTIFICATION,
    getNotificationList
  );
  // yield takeLatest('REQUEST_CHARACTER_DETAIL', getCharactersDetail);
}

export default function* notificationRoot() {
  yield all([watchAddTodo()]);
}
