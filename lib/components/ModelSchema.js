"use babel";

import React from "react";
import PropTypes from "prop-types";

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

function ModelSchema({ schema: { tableName, columns } }) {
  return (
    <div className="ModelSchema">
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
