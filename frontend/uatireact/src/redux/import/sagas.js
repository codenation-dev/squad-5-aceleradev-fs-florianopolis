import { put, all, call, takeLatest } from "redux-saga/effects";
import ServiceImport from "../../services/import";

import { ActionTypes } from "../actions";

function* uploadClients(action) {
  try {
    const obj = new FormData();
    obj.append("clients", action.payload.file);
    yield call(ServiceImport.tryImport, obj);

    yield put({
      type: ActionTypes.IMPORT.SUCCESS
    });
  } catch (err) {
    console.log("FAILURE ON ATTEMPTING IMPORT");
    console.log(err);
    yield put({
      type: ActionTypes.IMPORT.FAILURE,
      payload: { text: err.message }
    });
  }
}

function* watchAddTodo() {
  yield takeLatest(ActionTypes.IMPORT.REQUEST, uploadClients);
}

export default function* importRoot() {
  yield all([watchAddTodo()]);
}
