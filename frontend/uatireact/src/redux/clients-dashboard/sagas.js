import { put, all, call, takeLatest } from "redux-saga/effects";

import { ActionTypes } from "../actions";
import ServicesClients from "../../services/clients";

function* loadClients(action) {
  try {
    const response = yield call(
      ServicesClients.loadClientsDashboard
    );

    const filteredClients = ServicesClients.filterClients(action.payload.query, action.payload.pageNumber, response.Clients);

    yield put({
      type: ActionTypes.CLIENTS.SUCCESS,
      payload: {
        clients: filteredClients,
        pageNumber: action.payload.pageNumber,
        total: response.Clients.length,
        query: action.payload.query
      }
    });
  } catch (err) {
    yield put({
      type: ActionTypes.CLIENTS.FAILURE,
      payload: { err: err.message }
    });
  }
}

function* watchLoadClients() {
  yield takeLatest(ActionTypes.CLIENTS.REQUEST, loadClients);
}

export default function* clientsRoot() {
  yield all([watchLoadClients()]);
}
