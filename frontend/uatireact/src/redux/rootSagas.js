import { all } from "redux-saga/effects";
import loginRoot from "./login/sagas";
import userRoot from "./user/sagas";
import notificationRoot from "./notification/sagas";

export default function* rootSagas() {
  // here we initialize all the sagas from different files
  yield all([loginRoot(), userRoot(), notificationRoot()]);
}
