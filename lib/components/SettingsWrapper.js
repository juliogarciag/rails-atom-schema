"use babel";

import React from "react";
import { connect } from "react-redux";
import { toggleSettingsActions, schemaRequested } from "../store/actions";

function SchemaSettings({ showActions, toggleActions, reloadSchema }) {
  const toggleCopy = showActions
    ? "Hide additional actions"
    : "Show additional actions";

  return (
    <div className="SchemaSettings">
      <label className="input-label">
        <input
          className="input-toggle"
          type="checkbox"
          checked={showActions}
          onChange={toggleActions}
        />{" "}
        {toggleCopy}
      </label>
      {showActions && (
        <div className="SchemaSettings--actions">
          <button
            onClick={reloadSchema}
            className="btn icon icon-sync inline-block-tight"
          >
            Reload schema
          </button>
        </div>
      )}
    </div>
  );
}

const SchemaSettingsContainer = connect(
  ({ schemaSettings, currentEditor }) => ({
    showActions: schemaSettings.showActions,
    currentProject: currentEditor.currentProject
  }),
  dispatch => ({
    toggleActions: () => dispatch(toggleSettingsActions()),
    schemaRequested: projectPath => dispatch(schemaRequested(projectPath))
  }),
  (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    reloadSchema: () => dispatchProps.schemaRequested(stateProps.currentProject)
  })
)(SchemaSettings);

export default function SettingsWrapper({ children }) {
  return (
    <div className="SettingsWrapper--wrapper">
      <SchemaSettingsContainer />
      {children}
    </div>
  );
}
