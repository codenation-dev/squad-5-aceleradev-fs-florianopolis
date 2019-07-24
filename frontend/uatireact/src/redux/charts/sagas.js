import { put, all, call, takeLatest } from "redux-saga/effects";
import ServiceCharts from "../../services/charts";

import { ActionTypes } from "../actions";

function* loadCharts(action) {
    try {
        console.log('chegou');
        const clientsRelation = yield call(ServiceCharts.loadClientsRelation);
        const notificationsSentPerDay = yield call(ServiceCharts.loadNotificationsSentPerDay);
        const newClientsPerDay = yield call(ServiceCharts.loadNewClientsPerDay);

        yield put({
            type: ActionTypes.SUCCESS_LOAD_CHARTS,
            payload: {
                clientsRelation,
                notificationsSentPerDay,
                newClientsPerDay
            }
        });
    } catch (err) {
        yield put({
            type: ActionTypes.FAILURE_LOAD_CHARTS,
            payload: { text: err.message }
        });
    }

}

function* watchLoadCharts(action) {
    yield takeLatest(ActionTypes.REQUEST_LOAD_CHARTS, loadCharts);
}

export default function* chartsRoot() {
    yield all([watchLoadCharts()]);
}
