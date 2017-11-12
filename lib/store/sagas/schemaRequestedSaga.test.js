"use babel";

import schemaRequestedSaga from "./schemaRequestedSaga";
import { runInRails } from "../../tools";
import {
  schemaReceived,
  currentModelChangeRequested,
  schemaFailed
} from "../actions";
import path from "path";
import { call, put } from "redux-saga/effects";

const rootFolder = path.join(__dirname, "../../..");
const railsRoot = path.join(rootFolder, "rails-projects/project-1");

describe("schemaRequestedSaga", () => {
  const schema = {};
  const currentEditorPath = "/current/editor/path";
  const currentEditor = { getPath: () => currentEditorPath };
  let iterator;

  beforeEach(() => {
    iterator = schemaRequestedSaga({ railsRoot }, currentEditor);
  });

  const testRubyScriptIsCalled = () => {
    expect(iterator.next().value).toEqual(
      call(runInRails, railsRoot, "fetch_schema")
    );
  };

  test("when the ruby call works", () => {
    testRubyScriptIsCalled();
    expect(iterator.next(schema).value).toEqual(
      put(schemaReceived(railsRoot, schema))
    );
    expect(iterator.next().value).toEqual(
      put(currentModelChangeRequested(railsRoot, currentEditorPath))
    );
  });

  test("when the ruby call fails", () => {
    testRubyScriptIsCalled();
    expect(iterator.throw(new Error("Script Error")).value).toEqual(
      put(schemaFailed(railsRoot, "Error: Script Error"))
    );
  });
});
