"use babel";

export const FILE_ERROR = "FILE_ERROR";
export const START_MODEL_LOADING = "START_MODEL_LOADING";
export const LOAD_MODEL_SCHEMA = "LOAD_MODEL_SCHEMA";

function fileError(message) {
  return { type: FILE_ERROR, message };
}

function startModelLoading() {
  return { type: START_MODEL_LOADING };
}

function loadModelSchema(tableName, columns) {
  return { type: LOAD_MODEL_SCHEMA, tableName, columns };
}

export { fileError, startModelLoading, loadModelSchema };
