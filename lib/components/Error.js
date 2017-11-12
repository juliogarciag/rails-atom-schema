"use babel";

import React from "react";

const MESSAGES = {
  "no-editor": "This is not an editor.",
  "not-in-rails-project": "This file is not in a Rails project.",
  "schema-loading-failed": "Loading of the schema has failed.",
  "no-ruby-file": "This file is not a ruby file.",
  "no-model-found": "This file is not a recognized Rails model."
};

export default function Error({ messageKey }) {
  return <div>{MESSAGES[messageKey]}</div>;
}
