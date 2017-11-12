"use babel";

import { put, select } from "redux-saga/effects";
import {
  currentEditorIsNotInRailsProject,
  currentEditorRailsProjectFound,
  schemaRequested,
  currentModelChangeRequested
} from "../actions";
import { findRailsRoot } from "../../tools";

function decideEditorChangeAction(railsProjectState) {
  if (!railsProjectState) {
    return { shouldLoadSchema: true, shouldChangeModel: false };
  } else {
    switch (railsProjectState.schemaLoadingState) {
      case "unstarted":
      case "failed":
        return { shouldLoadSchema: true, shouldChangeModel: false };
      case "succeeded":
        return { shouldLoadSchema: false, shouldChangeModel: true };
      default:
        return { shouldLoadSchema: false, shouldChangeModel: false };
    }
  }
}

export default function* editorChangedSaga({ editorPath }) {
  const railsRoot = findRailsRoot(editorPath);

  if (!railsRoot) {
    yield put(currentEditorIsNotInRailsProject());
    return;
  }

  yield put(currentEditorRailsProjectFound(railsRoot));

  const state = yield select();
  const railsProjectState = state.railsProjects[railsRoot];

  const { shouldLoadSchema, shouldChangeModel } = decideEditorChangeAction(
    railsProjectState
  );

  if (shouldLoadSchema) {
    yield put(schemaRequested(railsRoot));
  } else if (shouldChangeModel) {
    yield put(currentModelChangeRequested(railsRoot, editorPath));
  } else {
    return;
  }
}
