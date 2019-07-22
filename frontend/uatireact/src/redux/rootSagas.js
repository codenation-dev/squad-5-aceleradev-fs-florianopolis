import { all } from "redux-saga/effects";
import userRoot from "./user/sagas";
import clientsRoot from "./clients/sagas";

export default function* rootSagas() {
  // here we initialize all the sagas from different files
  yield all([userRoot(), clientsRoot()]);
}
