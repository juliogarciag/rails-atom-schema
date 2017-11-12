"use babel";

import editorChangedSaga from "./editorChangedSaga";
import {
  currentEditorIsNotInRailsProject,
  currentEditorRailsProjectFound,
  currentModelChangeRequested,
  schemaRequested
} from "../actions";
import path from "path";
import { put, select } from "redux-saga/effects";

const rootFolder = path.join(__dirname, "../../..");
const railsRoot = path.join(rootFolder, "rails-projects/project-1");

describe("editorChangedSaga", () => {
  test("when the path is outside a rails project", () => {
    const iterator = editorChangedSaga({
      editorPath: path.join(rootFolder, "package.json")
    });

    expect(iterator.next().value).toEqual(
      put(currentEditorIsNotInRailsProject())
    );
  });

  describe("when the path is inside a rails project", () => {
    let iterator;

    const editorPath = path.join(railsRoot, "README.md");

    const testUntilSelection = () => {
      expect(iterator.next().value).toEqual(
        put(currentEditorRailsProjectFound(railsRoot))
      );
      expect(iterator.next().value).toEqual(select());
    };

    const testSchemaNeedsToBeRequested = schemaLoadingState => {
      const fakeState = {
        railsProjects: { [railsRoot]: { schemaLoadingState } }
      };
      testUntilSelection();
      expect(iterator.next(fakeState).value).toEqual(
        put(schemaRequested(railsRoot))
      );
    };

    beforeEach(() => {
      iterator = editorChangedSaga({ editorPath });
    });

    test("when the project is unregistered", () => {
      const fakeState = { railsProjects: {} };
      testUntilSelection();
      expect(iterator.next(fakeState).value).toEqual(
        put(schemaRequested(railsRoot))
      );
    });

    test("when the project is registered and it hasn't started", () => {
      testSchemaNeedsToBeRequested("unstarted");
    });

    test("when the project is registered and it has failed to load", () => {
      testSchemaNeedsToBeRequested("failed");
    });

    test("when the project is registered and it has started to load", () => {
      const fakeState = {
        railsProjects: { [railsRoot]: { schemaLoadingState: "started" } }
      };
      testUntilSelection();
      expect(iterator.next(fakeState).done).toEqual(true);
    });

    test("when the project is registered and it has succeeded to load", () => {
      const fakeState = {
        railsProjects: { [railsRoot]: { schemaLoadingState: "succeeded" } }
      };
      testUntilSelection();
      expect(iterator.next(fakeState).value).toEqual(
        put(currentModelChangeRequested(railsRoot, editorPath))
      );
    });
  });
});
