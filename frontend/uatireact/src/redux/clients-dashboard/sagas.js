import { put, all, call, takeLatest } from "redux-saga/effects";

import { ActionTypes } from "../actions";
import ServicesClients from "../../services/clients";

function* loadClients(action) {
  try {
    const response = yield call(ServicesClients.loadClientsDashboard);

    const filteredClients = ServicesClients.filterClientsByQuery(
      action.payload.query,
      response.Clients
    );
    const offsetClients = ServicesClients.filterClientsByOffset(
      action.payload.pageNumber,
      filteredClients
    );

    yield put({
      type: ActionTypes.CLIENTS.SUCCESS,
      payload: {
        clients: offsetClients,
        pageNumber: action.payload.pageNumber,
        total: response.Clients.length,
        totalSearch: filteredClients.length
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
