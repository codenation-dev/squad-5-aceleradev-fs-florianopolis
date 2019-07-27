import { put, all, call, takeLatest } from "redux-saga/effects";
import ServiceNotification from "../../services/notification";

import { ActionTypes } from "../actions";

function* getNotificationList() {
  try {
    const response = yield call(ServiceNotification.getNotifications);
    
    yield put({
      type: ActionTypes.NOTIFICATION.SUCCESS,
      payload: { notificationList: response.alerts }
    });
  } catch (err) {
    console.log("FAILURE ON ATTEMPTING NOTIFICATIONS");
    console.log(err);
    yield put({
      type: ActionTypes.NOTIFICATION.FAILURE,
      payload: { text: err.message }
    });
  }
}

function* watchAddTodo() {
  yield takeLatest(ActionTypes.NOTIFICATION.REQUEST, getNotificationList);
}

export default function* notificationRoot() {
  yield all([watchAddTodo()]);
}
