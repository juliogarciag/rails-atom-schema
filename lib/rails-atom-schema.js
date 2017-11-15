"use babel";

import RailsAtomSchemaView from "./rails-atom-schema-view";
import { CompositeDisposable, Disposable } from "atom";

export default {
  subscriptions: null,

  config: {
    railsBinaryPath: {
      type: "string",
      default: "bin/rails",
      title: "Rails Binary Path",
      description: "The Rails binary relative to a Rails project."
    }
  },

  activate() {
    this.subscriptions = new CompositeDisposable(
      // Add opener
      atom.workspace.addOpener(uri => {
        if (uri === "atom://rails-atom-schema") {
          return new RailsAtomSchemaView();
        }
      }),
      // Add toggler
      atom.commands.add("atom-workspace", {
        "rails-atom-schema:toggle": () => this.toggle()
      }),
      // Destroy views when package is deactivated
      new Disposable(() => {
        atom.workspace.getPaneItems().forEach(item => {
          if (item instanceof RailsAtomSchemaView) {
            item.destroy();
          }
        });
      })
    );
  },

  deserializeSchema(serializedState) {
    // NOTE: When deserializing a package, atom doesn't activate it
    //       so the package doesn't activate the stylesheets.
    // TODO: Remove when https://github.com/atom/atom/issues/16099 gets to a conclusion.
    atom.packages.loadPackage("rails-atom-schema").activateStylesheets();
    return new RailsAtomSchemaView(serializedState.state);
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle() {
    atom.workspace.toggle("atom://rails-atom-schema");
  }
};
