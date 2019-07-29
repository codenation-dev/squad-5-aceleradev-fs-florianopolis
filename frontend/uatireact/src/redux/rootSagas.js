import { all } from "redux-saga/effects";
import loginRoot from "./login/sagas";
import userRoot from "./user/sagas";
import notificationRoot from "./notification/sagas";
import importRoot from "./import/sagas";
import chartRoot from "./charts/sagas";
import clientsDashboardRoot from "./clients-dashboard/sagas";
import candidatesRoot from "./candidates/sagas";

export default function* rootSagas() {
  yield all([
    loginRoot(),
    userRoot(),
    notificationRoot(),
    importRoot(),
    chartRoot(),
    clientsDashboardRoot(),
    candidatesRoot()
  ]);
}
