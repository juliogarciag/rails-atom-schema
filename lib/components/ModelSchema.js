"use babel";

import React from "react";
import PropTypes from "prop-types";

function ColumnRow({ column }) {
  return (
    <tr>
      <td>{column.name}</td>
      <td>{column.type}</td>
    </tr>
  );
}

function ModelSchema({ schema: { tableName, columns } }) {
  return (
    <div>
      <h1>{tableName}</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
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
        type: PropTypes.string
      })
    )
  })
};

export default ModelSchema;
