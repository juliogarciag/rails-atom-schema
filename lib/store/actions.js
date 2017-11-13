"use babel";

export const CURRENT_EDITOR_IS_NOT_EDITOR = "CURRENT_EDITOR_IS_NOT_EDITOR";
export const CURRENT_EDITOR_IS_NOT_A_RUBY_FILE =
  "CURRENT_EDITOR_IS_NOT_A_RUBY_FILE";
export const CURRENT_EDITOR_IS_NOT_A_RAILS_MODEL =
  "CURRENT_EDITOR_IS_NOT_A_RAILS_MODEL";
export const CURRENT_EDITOR_IS_NOT_IN_RAILS_PROJECT =
  "CURRENT_EDITOR_IS_NOT_IN_RAILS_PROJECT";
export const CURRENT_EDITOR_RAILS_PROJECT_FOUND =
  "CURRENT_EDITOR_RAILS_PROJECT_FOUND";
export const EDITOR_CHANGED = "EDITOR_CHANGED";
export const SCHEMA_REQUESTED = "SCHEMA_REQUESTED";
export const SCHEMA_RECEIVED = "SCHEMA_RECEIVED";
export const SCHEMA_FAILED = "SCHEMA_FAILED";
export const CURRENT_MODEL_CHANGE_REQUESTED = "CURRENT_MODEL_CHANGE_REQUESTED";
export const CURRENT_MODEL_CHANGED = "CURRENT_MODEL_CHANGED";
export const SETTINGS_TOGGLE_ACTIONS = "SETTINGS_TOGGLE_ACTIONS";

export function currentEditorIsNotEditor() {
  return { type: CURRENT_EDITOR_IS_NOT_EDITOR };
}

export function currentEditorIsNotARubyFile() {
  return { type: CURRENT_EDITOR_IS_NOT_A_RUBY_FILE };
}

export function currentEditorIsNotARailsModel() {
  return { type: CURRENT_EDITOR_IS_NOT_A_RAILS_MODEL };
}

export function currentEditorIsNotInRailsProject() {
  return { type: CURRENT_EDITOR_IS_NOT_IN_RAILS_PROJECT };
}

export function currentEditorRailsProjectFound(railsRoot) {
  return { type: CURRENT_EDITOR_RAILS_PROJECT_FOUND, railsRoot };
}

export function editorChanged(editorPath) {
  return { type: EDITOR_CHANGED, editorPath };
}

export function schemaRequested(railsRoot) {
  return { type: SCHEMA_REQUESTED, railsRoot };
}

export function schemaReceived(railsRoot, schema) {
  return { type: SCHEMA_RECEIVED, railsRoot, schema };
}

export function schemaFailed(railsRoot, errorMessage) {
  return { type: SCHEMA_FAILED, railsRoot, errorMessage };
}

export function currentModelChangeRequested(railsRoot, editorPath) {
  return { type: CURRENT_MODEL_CHANGE_REQUESTED, railsRoot, editorPath };
}

export function currentModelChanged(editorPath) {
  return { type: CURRENT_MODEL_CHANGED, editorPath };
}

export function toggleSettingsActions() {
  return { type: SETTINGS_TOGGLE_ACTIONS };
}
