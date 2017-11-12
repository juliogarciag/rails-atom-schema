"use babel";

import React from "react";
import { connect } from "react-redux";
import SchemaLoader from "./SchemaLoader";
import ModelSchema from "./ModelSchema";
import Error from "./Error";

function StateRouter({
  isEditor,
  isInRailsProject,
  isProjectLoading,
  projectFailedToLoad,
  isProjectLoaded,
  isRubyFile,
  isModel,
  modelSchema
}) {
  if (!isEditor) return <Error messageKey="no-editor" />;
  if (!isInRailsProject) return <Error messageKey="not-in-rails-project" />;
  if (isProjectLoading) return <SchemaLoader />;
  if (projectFailedToLoad) return <Error messageKey="schema-loading-failed" />;
  if (isProjectLoaded) {
    if (!isRubyFile) return <Error messageKey="no-ruby-file" />;
    if (!isModel) return <Error messageKey="no-model-found" />;
    if (modelSchema) return <ModelSchema schema={modelSchema} />;
  }
  return null;
}

const StateRouterContainer = connect(({ currentEditor, railsProjects }) => {
  const currentProject = railsProjects[currentEditor.currentProject];
  const {
    isEditor,
    isInRailsProject,
    isRubyFile,
    isModel,
    currentModelPath
  } = currentEditor;

  return {
    isEditor,
    isInRailsProject,
    isRubyFile,
    isModel,
    isProjectLoading:
      currentProject && currentProject.schemaLoadingState === "started",
    projectFailedToLoad:
      currentProject && currentProject.schemaLoadingState === "failed",
    isProjectLoaded:
      currentProject && currentProject.schemaLoadingState === "succeeded",
    modelSchema:
      currentProject && currentProject.modelSchemasByModelPath[currentModelPath]
  };
})(StateRouter);

export default function App() {
  return (
    <div className="rails-atom-schema">
      <StateRouterContainer />
    </div>
  );
}
