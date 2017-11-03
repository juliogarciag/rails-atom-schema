"use babel";

import RailsAtomSchemaView from "./rails-atom-schema-view";
import { CompositeDisposable, Disposable } from "atom";

export default {
  subscriptions: null,

  activate(_state) {
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

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle() {
    atom.workspace.toggle("atom://rails-atom-schema");
  }
};
