import { put, all, call, takeLatest } from "redux-saga/effects";

import { ActionTypes } from "../actions";
import ServiceCandidates from "../../services/candidates";

function* loadCandidates(action) {
  try {
    const response = yield call(
      ServiceCandidates.loadCandidates,
      action.payload.query,
      action.payload.pageNumber
    );

    yield put({
        type: ActionTypes.SUCCESS_LOAD_CANDIDATES,
        payload: {
          candidates: response.candidates,
          pageNumber: response.pageNumber,
          total: response.total,
          query: response.query
        }
      });
  } catch (err) {
    yield put({
      type: ActionTypes.FAILURE_LOAD_CANDIDATES,
      payload: { err: err.message }
    });
  }
}

function* watchLoadClients() {
  yield takeLatest(ActionTypes.REQUEST_LOAD_CANDIDATES, loadCandidates);
}

export default function* clientsRoot() {
  yield all([watchLoadClients()]);
}
