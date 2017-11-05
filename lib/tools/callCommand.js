"use babel";

import { spawn } from "child-process-promise";

export default function callCommand(command, args) {
  return spawn(command, args, { capture: ["stdout"] }).then(parseSpawnResult);
}

function parseSpawnResult(result) {
  return JSON.parse(result.stdout);
}
