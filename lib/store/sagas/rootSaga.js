"use babel";

import { takeEvery } from "redux-saga/effects";
import {
  EDITOR_CHANGED,
  SCHEMA_REQUESTED,
  CURRENT_MODEL_CHANGE_REQUESTED
} from "../actions";
import editorChangedSaga from "./editorChangedSaga";
import schemaRequestedSaga from "./schemaRequestedSaga";
import currentModelChangeRequestedSaga from "./currentModelChangeRequestedSaga";

export default function* rootSaga() {
  yield takeEvery(EDITOR_CHANGED, editorChangedSaga);
  yield takeEvery(SCHEMA_REQUESTED, schemaRequestedSaga);
  yield takeEvery(
    CURRENT_MODEL_CHANGE_REQUESTED,
    currentModelChangeRequestedSaga
  );
}
