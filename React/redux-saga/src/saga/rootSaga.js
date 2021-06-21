import { all } from "redux-saga/effects";
import { sessionSaga } from "./sessionSaga";
import { contactSaga } from "./contactSaga";

export default function* rootSaga() {
  yield all([sessionSaga(), contactSaga()]);
}
