"use babel";

import { createStore } from "redux";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import reducer from "./store/reducer";
import App from "./components/App";
import handleEditorChange from "./handleEditorChange";
import { watchPath } from "atom";
import findRailsRoot from "./tools/findRailsRoot";
import path from "path";
import { clearModelSchemas } from "./store/actions";

export default class RailsAtomSchemaView {
  constructor(_serializedState) {
    this.element = document.createElement("div");

    const store = createStore(reducer);

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      this.element
    );

    this.editorChangeSubscriptions = atom.workspace
      .getCenter()
      .observeActivePaneItem(item => {
        handleEditorChange(item, store.dispatch, store.getState());
        this.setupSchemaWatcher(item, store);
      });
  }

  async setupSchemaWatcher(item, store) {
    if (!atom.workspace.isTextEditor(item)) {
      return;
    }

    const railsRoot = findRailsRoot(item.getPath());

    if (!railsRoot) {
      return;
    }

    if (this.schemaWatcher) {
      this.schemaWatcher.dispose();
    }

    this.schemaWatcher = await watchPath(
      path.join(railsRoot, "db", "schema.rb"),
      {},
      events => {
        events.forEach(event => {
          if (event.action === "modified") {
            store.dispatch(clearModelSchemas());
            const currentEditor = atom.workspace
              .getCenter()
              .getActiveTextEditor();
            if (currentEditor) {
              handleEditorChange(
                currentEditor,
                store.dispatch,
                store.getState()
              );
            }
          }
        });
      }
    );
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
    this.editorChangeSubscriptions.dispose();
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}
