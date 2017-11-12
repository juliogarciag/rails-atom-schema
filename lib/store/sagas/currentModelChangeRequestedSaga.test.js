"use babel";

import currentModelChangeRequestedSaga from "./currentModelChangeRequestedSaga";
import {
  currentEditorIsNotARubyFile,
  currentEditorIsNotARailsModel,
  currentModelChanged
} from "../actions";
import path from "path";
import { put, select } from "redux-saga/effects";

const rootFolder = path.join(__dirname, "../../..");
const railsRoot = path.join(rootFolder, "rails-projects/project-1");

describe("currentModelChangeRequestedSaga", () => {
  test("when the file is not a ruby file", () => {
    const editorPath = "/current/editor/path.js";
    const iterator = currentModelChangeRequestedSaga({ railsRoot, editorPath });
    expect(iterator.next().value).toEqual(put(currentEditorIsNotARubyFile()));
  });

  describe("when the file is a ruby file", () => {
    let iterator;
    const editorPath = "/current/editor/path.rb";

    beforeEach(() => {
      iterator = currentModelChangeRequestedSaga({ railsRoot, editorPath });
    });

    test("when the file is in the rails project", () => {
      const modelSchema = {};
      const fakeState = {
        railsProjects: {
          [railsRoot]: {
            modelSchemasByModelPath: {
              [editorPath]: modelSchema
            }
          }
        }
      };

      expect(iterator.next().value).toEqual(select());
      expect(iterator.next(fakeState).value).toEqual(
        put(currentModelChanged(editorPath))
      );
    });

    test("when the file is not in the rails project", () => {
      const modelSchema = {};
      const fakeState = {
        railsProjects: {
          [railsRoot]: {
            modelSchemasByModelPath: {
              ["other/model.rb"]: modelSchema
            }
          }
        }
      };

      expect(iterator.next().value).toEqual(select());
      expect(iterator.next(fakeState).value).toEqual(
        put(currentEditorIsNotARailsModel())
      );
    });
  });
});
