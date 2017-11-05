"use babel";

import {
  LOADING_ERROR,
  START_MODEL_LOADING,
  LOAD_MODEL_SCHEMA,
  CHANGE_CURRENT_MODEL_PATH,
  CLEAR_MODEL_SCHEMAS
} from "./actions";

const LOADING_STATES = {
  unstarted: "unstarted",
  started: "started",
  succeeded: "succeeded",
  failed: "failed"
};

const initialState = {
  loadingError: null,
  loadingState: LOADING_STATES.unstarted,
  modelSchemas: {},
  currentModelPath: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_MODEL_LOADING:
      return { ...state, loadingState: LOADING_STATES.started };
    case LOADING_ERROR:
      return {
        ...state,
        loadingError: action.message,
        loadingState: LOADING_STATES.failed
      };
    case LOAD_MODEL_SCHEMA:
      return {
        ...state,
        loadingState: LOADING_STATES.succeeded,
        loadingError: null,
        currentModelPath: action.modelPath,
        modelSchemas: {
          ...state.modelSchemas,
          [action.modelPath]: {
            tableName: action.tableName,
            columns: action.columns
          }
        }
      };
    case CHANGE_CURRENT_MODEL_PATH:
      return {
        ...state,
        loadingState: LOADING_STATES.succeeded,
        loadingError: null,
        currentModelPath: action.modelPath
      };
    case CLEAR_MODEL_SCHEMAS:
      return initialState;
    default:
      return state;
  }
}
