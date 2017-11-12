"use babel";

import { put, call } from "redux-saga/effects";
import { runInRails } from "../../tools";
import {
  schemaFailed,
  schemaReceived,
  currentModelChangeRequested
} from "../actions";

export default function* schemaRequestedSaga(
  { railsRoot },
  currentEditor = atom.workspace.getCenter().getActiveTextEditor()
) {
  try {
    const projectSchema = yield call(runInRails, railsRoot, "fetch_schema");
    yield put(schemaReceived(railsRoot, projectSchema));
    yield put(currentModelChangeRequested(railsRoot, currentEditor.getPath()));
  } catch (e) {
    yield put(schemaFailed(railsRoot, e.toString()));
  }
}
