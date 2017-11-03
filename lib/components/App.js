"use babel";

import React from "react";
import { connect } from "react-redux";
import Loader from "./Loader";
import ModelSchema from "./ModelSchema";
import FileError from "./FileError";

function App({ fileError, loadingState, modelSchema }) {
  switch (loadingState) {
    case "started":
      return <Loader />;
    case "succeeded":
      return <ModelSchema schema={modelSchema} />;
    case "failed":
      return <FileError message={fileError} />;
    default:
      return null;
  }
}

export default connect(state => ({
  fileError: state.fileError,
  loadingState: state.loadingState,
  modelSchema: state.modelSchema
}))(App);
