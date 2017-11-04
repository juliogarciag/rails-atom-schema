"use babel";

import { FILE_ERROR, START_MODEL_LOADING, LOAD_MODEL_SCHEMA } from "./actions";

const initialState = {
  fileError: null,
  loadingState: "unstarted", // unstarted, started, succeeded, failed,
  modelSchema: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_MODEL_LOADING:
      return { ...state, loadingState: "started", modelSchema: null };
    case FILE_ERROR:
      return {
        ...state,
        fileError: action.message,
        loadingState: "failed"
      };
    case LOAD_MODEL_SCHEMA:
      return {
        ...state,
        loadingState: "succeeded",
        fileError: null,
        modelSchema: {
          tableName: action.tableName,
          columns: action.columns
        }
      };
    default:
      return state;
  }
}
