import { put, all, call, takeLatest } from "redux-saga/effects";

import { ActionTypes } from "../actions";
import ServicesClients from "../../services/clients";

function* loadClients(action) {
  console.log(action);
  try {
    const response = yield call(
      ServicesClients.loadClientsDashboard,
      action.payload.query,
      action.payload.pageNumber
    );
    console.log(response);

    yield put({
      type: ActionTypes.CLIENTS.SUCCESS,
      payload: {
        clients: response.clients,
        pageNumber: response.pageNumber,
        totalClients: response.totalClients,
        query: response.query
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
