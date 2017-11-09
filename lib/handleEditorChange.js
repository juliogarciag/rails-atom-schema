"use babel";

import {
  loadingError,
  startModelLoading,
  loadModelSchema,
  changeCurrentModelPath
} from "./store/actions";
import path from "path";
import findRailsRoot from "./tools/findRailsRoot";
import changeDirectoryForPromise from "./tools/changeDirectoryForPromise";
import callCommand from "./tools/callCommand";

const NO_EDITOR_MESSAGE = "This is not an editor.";
const NO_RUBY_FILE_MESSAGE = "This is not a Ruby file.";
const NO_RAILS_PROJECT_MESSAGE = "This file is not in a Rails project.";
const NO_RAILS_MODEL_MESSAGE = "This file is not a model.";

function handleEditorChange(editor, store) {
  if (!atom.workspace.isTextEditor(editor)) {
    store.dispatch(loadingError(NO_EDITOR_MESSAGE));
    return;
  }

  const state = store.getState();

  if (state.loadingState === "started") {
    return;
  }

  const modelPath = editor.getPath();

  if (!isRubyEditor(editor)) {
    store.dispatch(loadingError(NO_RUBY_FILE_MESSAGE, modelPath));
    return;
  }

  if (state.modelSchemas[modelPath]) {
    const schema = state.modelSchemas[modelPath];
    if (schema.isModel) {
      store.dispatch(changeCurrentModelPath(modelPath));
    } else {
      store.dispatch(loadingError(schema.loadingError));
    }
    return;
  }

  const railsRoot = findRailsRoot(modelPath);
  if (!railsRoot) {
    store.dispatch(loadingError(NO_RAILS_PROJECT_MESSAGE, modelPath));
    return;
  }

  startModelLoadingProcess(modelPath, railsRoot, store);
}

async function startModelLoadingProcess(modelPath, railsRoot, store) {
  store.dispatch(startModelLoading(modelPath));

  try {
    const { modelName } = await getModelClassInfo(modelPath, railsRoot);
    if (!modelName) {
      store.dispatch(loadingError(NO_RAILS_MODEL_MESSAGE, modelPath));
      reloadWithCurrentEditor(store);
      return;
    }

    const { tableName, columns } = await getModelSchemaInfo(
      modelPath,
      modelName,
      railsRoot
    );
    store.dispatch(loadModelSchema(modelPath, tableName, columns));
    reloadWithCurrentEditor(store);
  } catch (error) {
    store.dispatch(loadingError(error.message, modelPath));
  }
}

function reloadWithCurrentEditor(store) {
  const currentEditor = atom.workspace.getCenter().getActiveTextEditor();
  handleEditorChange(currentEditor, store);
}

function isRubyEditor(editor) {
  const extensions = editor.getRootScopeDescriptor().getScopesArray();
  return extensions.includes("source.ruby");
}

function getModelClassInfo(modelPath, railsRoot) {
  return changeDirectoryForPromise(railsRoot, () =>
    callCommand("bin/rails", [
      "runner",
      getRubyScript("model_class_info"),
      modelPath
    ])
  );
}

function getModelSchemaInfo(modelPath, modelName, railsRoot) {
  return changeDirectoryForPromise(railsRoot, () =>
    callCommand("bin/rails", [
      "runner",
      getRubyScript("model_schema_info"),
      modelName
    ])
  );
}

function getRubyScript(scriptName) {
  return path.join(__dirname, `./ruby-scripts/${scriptName}.rb`);
}

export default handleEditorChange;
