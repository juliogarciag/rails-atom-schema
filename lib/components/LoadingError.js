"use babel";

import React from "react";

export default function LoadingError({ message }) {
  return (
    <div>
      <h4>
        <code>rails-model-schema</code> load has failed
      </h4>
      <p>
        <em>{message}</em>
      </p>
    </div>
  );
}
