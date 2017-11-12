"use babel";

import React from "react";
import ReactLoader from "react-loaders";

export default function SchemaLoader() {
  return (
    <div className="Loader">
      <code className="Loader--text">Loading schema</code>
      <ReactLoader type="ball-scale-ripple-multiple" />
    </div>
  );
}
