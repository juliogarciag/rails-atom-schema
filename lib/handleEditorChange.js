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

const NO_RUBY_FILE_MESSAGE = "This is not a Ruby file.";
const NO_RAILS_PROJECT_MESSAGE = "This file is not in a Rails project.";
const NO_RAILS_MODEL_MESSAGE = "This file is not a model.";

function handleEditorChange(editor, dispatch, state) {
  if (!isValidEditor(editor)) {
    dispatch(loadingError(NO_RUBY_FILE_MESSAGE));
    return;
  }

  const modelPath = editor.getPath();

  if (state.modelSchemas[modelPath]) {
    dispatch(changeCurrentModelPath(modelPath));
    return;
  }

  const railsRoot = findRailsRoot(modelPath);
  if (!railsRoot) {
    dispatch(loadingError(NO_RAILS_PROJECT_MESSAGE));
    return;
  }

  startModelLoadingProcess(modelPath, railsRoot, dispatch);
}

async function startModelLoadingProcess(modelPath, railsRoot, dispatch) {
  dispatch(startModelLoading());

  try {
    const { modelName } = await getModelClassInfo(modelPath, railsRoot);
    if (!modelName) {
      dispatch(loadingError(NO_RAILS_MODEL_MESSAGE));
      return;
    }

    const { tableName, columns } = await getModelSchemaInfo(
      modelPath,
      modelName,
      railsRoot
    );
    dispatch(loadModelSchema(modelPath, tableName, columns));
  } catch (error) {
    dispatch(loadingError(error.message));
  }
}

function isValidEditor(editor) {
  return atom.workspace.isTextEditor(editor) && isRubyEditor(editor);
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
