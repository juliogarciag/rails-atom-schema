"use babel";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createStore from "./store/createStore";
import {
  currentEditorIsNotEditor,
  editorChanged,
  currentEditorRailsProjectFound,
  schemaRequested
} from "./store/actions";
import App from "./components/App";
import path from "path";
import { watchPath } from "atom";

export default class RailsAtomSchemaView {
  constructor(serializedState) {
    this.element = document.createElement("div");

    this.store = createStore(serializedState);

    ReactDOM.render(
      <Provider store={this.store}>
        <App />
      </Provider>,
      this.element
    );

    this.editorChangeSubscriptions = atom.workspace
      .getCenter()
      .observeActivePaneItem(item => {
        if (atom.workspace.isTextEditor(item)) {
          this.store.dispatch(editorChanged(item.getPath()));
        } else {
          this.store.dispatch(currentEditorIsNotEditor());
        }
      });
    this.ensureSchemaWatchers();
  }

  ensureSchemaWatchers() {
    this.projectSchemaWatchers = {};
    const projectWatchUnsubscriber = this.store.subscribe(() => {
      const state = this.store.getState();
      Object.keys(state.railsProjects).forEach(projectSchema =>
        this.ensureProjectSchemaWatcher(projectSchema)
      );
    });
    this.storeUnsubscribers = [projectWatchUnsubscriber];
  }

  async ensureProjectSchemaWatcher(projectPath) {
    if (!this.projectSchemaWatchers[projectPath]) {
      this.projectSchemaWatchers[projectPath] = await watchPath(
        path.join(projectPath, "db", "schema.rb"),
        {},
        events => {
          events.forEach(event => {
            if (event.action === "modified") {
              this.store.dispatch(currentEditorRailsProjectFound(projectPath));
              this.store.dispatch(schemaRequested(projectPath));
            }
          });
        }
      );
    }
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

  serialize() {
    return {
      deserializer: "rails-atom-schema/RailsAtomSchemaView",
      state: this.store.getState()
    };
  }

  destroy() {
    this.element.remove();
    this.editorChangeSubscriptions.dispose();
    Object.values(this.projectSchemaWatchers).forEach(watcher =>
      watcher.dispose()
    );
    this.storeUnsubscribers.forEach(unsubscribe => unsubscribe());
  }

  getElement() {
    return this.element;
  }
}
