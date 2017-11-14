"use babel";

import React from "react";
import { connect } from "react-redux";
import SchemaLoader from "./SchemaLoader";
import ModelSchema from "./ModelSchema";
import SettingsWrapper from "./SettingsWrapper";
import Error from "./Error";

function wrapWithSettings(children) {
  return <SettingsWrapper>{children}</SettingsWrapper>;
}

function StateRouter(props) {
  const {
    isEditor,
    isInRailsProject,
    isProjectLoading,
    projectFailedToLoad,
    isProjectLoaded,
    isRubyFile,
    isModel,
    modelSchema
  } = props;

  if (!isEditor) return <Error messageKey="no-editor" />;
  if (!isInRailsProject) return <Error messageKey="not-in-rails-project" />;
  if (isProjectLoading) {
    return wrapWithSettings(<SchemaLoader />);
  }
  if (projectFailedToLoad)
    return wrapWithSettings(<Error messageKey="schema-loading-failed" />);
  if (isProjectLoaded) {
    if (!isRubyFile)
      return wrapWithSettings(<Error messageKey="no-ruby-file" />);
    if (!isModel)
      return wrapWithSettings(<Error messageKey="no-model-found" />);
    if (modelSchema)
      return wrapWithSettings(<ModelSchema schema={modelSchema} />);
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
