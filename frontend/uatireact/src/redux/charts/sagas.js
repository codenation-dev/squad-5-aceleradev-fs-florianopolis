import { put, all, call, takeLatest } from "redux-saga/effects";
import ServiceCharts from "../../services/charts";

import { ActionTypes } from "../actions";

function* loadCharts() {
    try {
        
        const clientsRelation = yield call(ServiceCharts.loadClientsRelation);
        const notificationsSentPerDay = yield call(ServiceCharts.loadNotificationsSentPerDay);
        const newClientsPerDay = yield call(ServiceCharts.loadNewClientsPerDay);

        yield put({
            type: ActionTypes.CHART.SUCCESS,
            payload: {
                clientsRelation,
                notificationsSentPerDay,
                newClientsPerDay
            }
        });
    } catch (err) {
        yield put({
            type: ActionTypes.CHART.FAILURE,
            payload: { text: err.message }
        });
    }

}

function* watchLoadCharts(action) {
    yield takeLatest(ActionTypes.CHART.REQUEST, loadCharts);
}

export default function* chartsRoot() {
    yield all([watchLoadCharts()]);
}
