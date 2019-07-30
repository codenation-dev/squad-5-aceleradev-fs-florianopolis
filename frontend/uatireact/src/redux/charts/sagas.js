import { put, all, call, takeLatest } from "redux-saga/effects";
import ServiceCharts from "../../services/charts";

import { ActionTypes } from "../actions";

function* loadCharts() {
  try {
    const responseAlerts = yield call(ServiceCharts.loadAlerts);
    const response = yield call(ServiceCharts.getAvgSalaries);
    const notificationsSentPerDay = ServiceCharts.buildChartNotificationsSentPerDay(
      responseAlerts.alerts
    );

    yield put({
      type: ActionTypes.CHART.SUCCESS,

      payload: {
        notificationsSentPerDay
      }
    });

    yield put({
      type: ActionTypes.SALARIES_AVG.SUCCESS,
      payload: { ...response }
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
  yield takeLatest(ActionTypes.SALARIES_AVG.REQUEST, loadCharts);
}

export default function* chartsRoot() {
  yield all([watchLoadCharts()]);
}
