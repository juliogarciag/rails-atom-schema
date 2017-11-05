"use babel";

export const LOADING_ERROR = "LOADING_ERROR";
export const START_MODEL_LOADING = "START_MODEL_LOADING";
export const LOAD_MODEL_SCHEMA = "LOAD_MODEL_SCHEMA";
export const CHANGE_CURRENT_MODEL_PATH = "CHANGE_CURRENT_MODEL_PATH";
export const CLEAR_MODEL_SCHEMAS = "CLEAR_MODEL_SCHEMAS";

export function loadingError(message) {
  return { type: LOADING_ERROR, message };
}

export function startModelLoading() {
  return { type: START_MODEL_LOADING };
}

export function loadModelSchema(modelPath, tableName, columns) {
  return {
    type: LOAD_MODEL_SCHEMA,
    modelPath,
    tableName,
    columns
  };
}

export function clearModelSchemas() {
  return { type: CLEAR_MODEL_SCHEMAS };
}

export function changeCurrentModelPath(modelPath) {
  return { type: CHANGE_CURRENT_MODEL_PATH, modelPath };
}
