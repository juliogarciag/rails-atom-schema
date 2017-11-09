"use babel";

import React from "react";
import ReactLoader from "react-loaders";
import path from "path";

export default function Loader({ loadingModelPath }) {
  const modelBasePath = path.basename(loadingModelPath);

  return (
    <div className="Loader">
      <code className="Loader--text">Loading {modelBasePath}</code>
      <ReactLoader type="ball-scale-ripple-multiple" />
    </div>
  );
}
