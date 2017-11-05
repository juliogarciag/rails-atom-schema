"use babel";

import React from "react";
import { connect } from "react-redux";
import Loader from "./Loader";
import ModelSchema from "./ModelSchema";
import LoadingError from "./LoadingError";

function App({ loadingError, loadingState, modelSchema }) {
  switch (loadingState) {
    case "started":
      return <Loader />;
    case "succeeded":
      return <ModelSchema schema={modelSchema} />;
    case "failed":
      return <LoadingError message={loadingError} />;
    default:
      return null;
  }
}

export default connect(state => ({
  loadingError: state.loadingError,
  loadingState: state.loadingState,
  modelSchema: state.modelSchemas[state.currentModelPath]
}))(App);
