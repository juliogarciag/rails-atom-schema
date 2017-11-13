"use babel";

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleSettingsActions, schemaRequested } from "../store/actions";

function copyIntoClipboard(text) {
  atom.clipboard.write(text);
  atom.notifications.addInfo(`Copied: "${text}".`);
}

function ColumnRow({ column }) {
  return (
    <tr className="ColumnRow">
      <td className="ColumnRow--nameCell" title={column.name}>
        <span className="ColumnRow--name">{column.name}</span>
        <span
          className="ColumnRow--copy icon icon-clippy"
          title="copy name"
          onClick={() => copyIntoClipboard(column.name)}
        />
      </td>
      <td className="ColumnRow--typeCell" width="90">
        <span className="ColumnRow--type">{column.type}</span>
      </td>
    </tr>
  );
}

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

function ModelSchema({ schema: { tableName, columns } }) {
  return (
    <div className="ModelSchema">
      <SchemaSettingsContainer />
      <h1>{tableName}</h1>
      <table className="ModelSchema--columnsTable">
        <thead>
          <tr>
            <th>Name</th>
            <th width="90">Type</th>
          </tr>
        </thead>
        <tbody>
          {columns.map(column => (
            <ColumnRow key={column.name} column={column} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

ModelSchema.propTypes = {
  schema: PropTypes.shape({
    tableName: PropTypes.string,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        hasIndex: PropTypes.bool
      })
    )
  })
};

export default ModelSchema;
