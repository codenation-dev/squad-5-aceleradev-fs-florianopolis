import { put, all, call, takeLatest } from "redux-saga/effects";

import { ActionTypes } from "../actions";
import ServiceCandidates from "../../services/candidates";

function* loadCandidates() {
  try {

    const response = yield call(
      ServiceCandidates.loadCandidates
    );

    yield put({
        type: ActionTypes.CANDIDATES.SUCCESS,
        payload: {
          candidates: response.specials
        }
      });
  } catch (err) {
    yield put({
      type: ActionTypes.CANDIDATES.FAILURE,
      payload: { err: err.message }
    });
  }
}

function* watchLoadClients() {
  yield takeLatest(ActionTypes.CANDIDATES.REQUEST, loadCandidates);
}

export default function* clientsRoot() {
  yield all([watchLoadClients()]);
}
