"use babel";

import { combineReducers } from "redux";
import {
  CURRENT_EDITOR_IS_NOT_EDITOR,
  CURRENT_EDITOR_IS_NOT_A_RUBY_FILE,
  CURRENT_EDITOR_RAILS_PROJECT_FOUND,
  CURRENT_EDITOR_IS_NOT_A_RAILS_MODEL,
  CURRENT_EDITOR_IS_NOT_IN_RAILS_PROJECT,
  EDITOR_CHANGED,
  SCHEMA_REQUESTED,
  SCHEMA_FAILED,
  SCHEMA_RECEIVED,
  CURRENT_MODEL_CHANGED
} from "./actions";

const initialEditorState = {
  isEditor: false,
  isInRailsProject: false,
  currentProject: null,
  currentModelPath: null,
  isRubyFile: false,
  isModel: false
};

export function editorReducer(state = initialEditorState, action) {
  switch (action.type) {
    case CURRENT_EDITOR_IS_NOT_EDITOR:
      return { ...state, isEditor: false };
    case EDITOR_CHANGED:
      return { ...state, isEditor: true };
    case CURRENT_EDITOR_IS_NOT_IN_RAILS_PROJECT:
      return { ...state, currentProject: null, isInRailsProject: false };
    case CURRENT_EDITOR_RAILS_PROJECT_FOUND:
      return {
        ...state,
        isInRailsProject: true,
        currentProject: action.railsRoot
      };
    case CURRENT_EDITOR_IS_NOT_A_RUBY_FILE:
      return { ...state, isRubyFile: false };
    case CURRENT_EDITOR_IS_NOT_A_RAILS_MODEL:
      return { ...state, isModel: false };
    case CURRENT_MODEL_CHANGED:
      return {
        ...state,
        isRubyFile: true,
        isModel: true,
        currentModelPath: action.editorPath
      };
    default:
      return state;
  }
}

const initialProjectState = {
  schemaLoadingState: "unstarted",
  schemaLoadingError: null,
  modelSchemasByModelPath: {}
};

function railsSingleProjectReducer(state = initialProjectState, action) {
  switch (action.type) {
    case SCHEMA_REQUESTED:
      return {
        ...state,
        schemaLoadingState: "started",
        schemaLoadingError: null
      };
    case SCHEMA_FAILED:
      return {
        ...state,
        schemaLoadingState: "failed",
        schemaLoadingError: action.errorMessage
      };
    case SCHEMA_RECEIVED:
      return {
        ...state,
        schemaLoadingState: "succeeded",
        schemaLoadingError: null,
        modelSchemasByModelPath: action.schema.modelSchemas
      };
    default:
      return state;
  }
}

export function railsProjectsReducer(state = {}, action) {
  switch (action.type) {
    case SCHEMA_REQUESTED:
    case SCHEMA_RECEIVED:
    case SCHEMA_FAILED:
      return {
        ...state,
        [action.railsRoot]: railsSingleProjectReducer(
          state[action.railsRoot],
          action
        )
      };
    default:
      return state;
  }
}

export default combineReducers({
  currentEditor: editorReducer,
  railsProjects: railsProjectsReducer
});
