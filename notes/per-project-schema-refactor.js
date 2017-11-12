/* eslint-disable */

// State
const state = {
  currentEditor: {
    isEditor: true | false,
    isInRailsProject: true | false,
    currentProject: "path/to/project/root",
    currentModelPath: "path/to/project/root/app/models/product.rb",
    isRubyFile: true,
    isModel: true
  },
  projects: {
    "path/to/project/root": {
      schemaLoadingState: "unstarted|started|succeeded|failed",
      schemaLoadingError: "text, hopefully just for bugs and not normal",
      modelSchemasByModelPath: {
        "path/to/project/root/app/models/product.rb": {
          modelName,
          tableName,
          columns
        }
      }
    }
  }
};

// Tree
const App = () => {
  if (!isEditor) return <Error messageKey="no-editor" />;
  if (!isInRailsProject) return <Error messageKey="no-rails-project" />;
  if (isProjectLoading) return <SchemaLoading />;
  if (projectFailedToLoad) return <Error messageKey="schema-loading-failed" />;
  if (projectLoaded) {
    if (!isRubyFile) return <Error messageKey="no-ruby-file" />;
    if (!isModel) return <Error messageKey="no-model-found" />;
    return <ModelSchema modelSchema={modelSchema} />;
  }
};

// Flow
const flow = `
- Atom: When a new editor is selected
  - If this is not an editor, [set currentEditor.isEditor to false]. (ui: error 1)
  - Dispatch: EDITOR_CHANGED with the path of the editor.

- Reducer: Set currentEditor.isEditor to true.
- Saga: When EDITOR_CHANGED
  - If this is not a rails project, [set currentEditor.isInRailsProject to false]. (ui: error 2)
  - [Set currentEditor.currentProject] to the current rails project.
  - If the rails project is not on projects or its state is not started, dispatch: SCHEMA_REQUESTED with the rails project path.
  - If the rails project schema is loaded, dispatch CURRENT_MODEL_CHANGED with the editor path.

- Saga: When SCHEMA_REQUESTED
  - Set projects[projectPath].schemaLoadingState to started.
  - Execute Ruby code to get all the models data.
  - If it fails, fill projects[projectPath].schemaLoadingError with the error received and projects[projectPath].schemaLoadingState to failed. (ui: error 3)
  - If it succeeds
    - Loads the models into projects[projectPath].modelSchemasByModelPath
    - Dispatch CURRENT_MODEL_CHANGED with the current editor.

- Saga: When CURRENT_MODEL_CHANGED
  - If the path is not a ruby file (just check *.rb), set [currentEditor.isRubyFile to false] (ui: error 5)
  - If the path is not in the list of models of the schema, set [currentEditor.isModel to false]. (ui: error 4)
  - Set [currentEditor.currentModelPath to the path and currentEditor.isModel to true].
`;

/* eslint-enable */
