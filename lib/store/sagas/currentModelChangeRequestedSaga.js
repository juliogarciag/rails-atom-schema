"use babel";

import { put, select } from "redux-saga/effects";
import {
  currentEditorIsNotARubyFile,
  currentEditorIsNotARailsModel,
  currentModelChanged
} from "../actions";
import { isRubyFile } from "../../tools";

export default function* currentModelChangeRequestedSaga({
  railsRoot,
  editorPath
}) {
  if (!isRubyFile(editorPath)) {
    yield put(currentEditorIsNotARubyFile());
    return;
  }

  const state = yield select();
  const railsProjectState = state.railsProjects[railsRoot];

  if (!railsProjectState.modelSchemasByModelPath[editorPath]) {
    yield put(currentEditorIsNotARailsModel());
    return;
  }

  yield put(currentModelChanged(editorPath));
}
