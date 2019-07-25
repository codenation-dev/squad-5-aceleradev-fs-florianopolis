import { put, all, call, takeLatest } from "redux-saga/effects";

import { ActionTypes } from "../actions";
import ServicesClients from "../../services/clients";

function* loadClients(action) {
  try {
    const response = yield call(
      ServicesClients.loadClientsDashboard,
      action.pageNumber,
      action.query
    );

    yield put({
      type: ActionTypes.SUCCESS_LOAD_CLIENTS,
      payload: {
        clients: response.clients,
        pageNumber: response.pageNumber,
        totalClients: response.totalClients,
        query: response.query
      }
    });
  } catch (err) {
    yield put({
      type: ActionTypes.FAILURE_LOAD_CLIENTS,
      payload: { err: err.message }
    });
  }
}

function* watchLoadClients() {
  yield takeLatest(ActionTypes.REQUEST_LOAD_CLIENTS, loadClients);
}

export default function* clientsRoot() {
  yield all([watchLoadClients()]);
}
