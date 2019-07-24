import { put, all, call, takeLatest } from "redux-saga/effects";
import { upload } from "../../utils/api";

import { ActionTypes } from "../actions";

function* attemptToUpload(action) {
  try {
    const response = yield call(upload, action.payload);

    //Verifica se o usuário pode fazer upload, token valido, etc

    yield put({
      type: ActionTypes.SUCCESS_SUBMIT_FILE,
      payload: action.payload
    });
  } catch (err) {
    yield put({
      type: ActionTypes.FAILURE_SUBMIT_FILE,
      payload: { text: err.message }
    });
  }
}

function* watchFileUpload() {
  yield takeLatest(ActionTypes.REQUEST_SUBMIT_FILE, attemptToUpload);
}

export default function* clientsRoot() {
  yield all([watchFileUpload()]);
}
