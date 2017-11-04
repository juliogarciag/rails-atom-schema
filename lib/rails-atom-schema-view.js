"use babel";

import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { fileError, startModelLoading, loadModelSchema } from "./store/actions";
import reducer from "./store/reducer";
import App from "./components/App";
import { spawn } from "child-process-promise";
import path from "path";
import findRailsRoot from "./tools/findRailsRoot";

const NO_RAILS_MODEL_MESSAGE =
  "Open a ruby model file to see information related to it.";
const NO_RUBY_FILE_MESSAGE =
  "Open a ruby model file to see information related to it.";

export default class RailsAtomSchemaView {
  constructor(_serializedState) {
    this.element = document.createElement("div");
    this.element.classList.add("rails-atom-schema");

    const store = createStore(reducer, applyMiddleware(logger));

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      this.element
    );

    this.subscriptions = atom.workspace
      .getCenter()
      .observeActivePaneItem(item => {
        store.dispatch(startModelLoading());
        if (!atom.workspace.isTextEditor(item) || !this.isRubyEditor(item)) {
          store.dispatch(fileError(NO_RUBY_FILE_MESSAGE));
          return;
        } else {
          this.getModelInfo(item)
            .then(({ modelName }) => {
              return this.getModelSchemaInfo(
                item,
                modelName
              ).then(({ tableName, columns }) => {
                store.dispatch(loadModelSchema(tableName, columns));
              });
            })
            .catch(() => store.dispatch(fileError(NO_RAILS_MODEL_MESSAGE)));
        }
      });
  }

  getModelInfo(editor) {
    return spawn(
      "ruby",
      [path.join(__dirname, "./ruby-scripts/model_info.rb"), editor.getPath()],
      { capture: ["stdout"] }
    ).then(result => JSON.parse(result.stdout));
  }

  getModelSchemaInfo(editor, modelName) {
    const railsRoot = findRailsRoot(editor.getPath());
    if (!railsRoot) {
      return Promise.reject(NO_RAILS_MODEL_MESSAGE);
    }

    const originalCwd = process.cwd();
    process.chdir(railsRoot);

    return spawn(
      "bin/rails",
      [
        "runner",
        path.join(__dirname, "./ruby-scripts/model_schema_info.rb"),
        modelName
      ],
      { capture: ["stdout"] }
    )
      .then(result => {
        process.chdir(originalCwd);
        return JSON.parse(result.stdout);
      })
      .catch(error => {
        process.chdir(originalCwd);
        throw error;
      });
  }

  isRubyEditor(editor) {
    const extensions = editor.getRootScopeDescriptor().getScopesArray();
    return extensions.includes("source.ruby");
  }

  getTitle() {
    return "Rails Model Schema";
  }

  getURI() {
    return "atom://rails-atom-schema";
  }

  getDefaultLocation() {
    return "right";
  }

  getAllowedLocations() {
    return ["left", "right", "bottom"];
  }

  serialize() {}

  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}
