"use babel";

import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import reducer from "./store/reducer";
import App from "./components/App";
import handleEditorChange from "./handleEditorChange";

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

    this.editorChangeSubscriptions = atom.workspace
      .getCenter()
      .observeActivePaneItem(item =>
        handleEditorChange(item, store.dispatch, store.getState())
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
