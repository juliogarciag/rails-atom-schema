"use babel";

import path from "path";
import { spawn } from "child-process-promise";

function expandRubyScript(scriptName) {
  return path.join(__dirname, `../ruby-scripts/${scriptName}.rb`);
}

function parseSpawnResult(result) {
  return JSON.parse(result.stdout.toString());
}

export default function runInRails(railsRoot, rubyScript) {
  const originalCwd = process.cwd();
  process.chdir(railsRoot);
  const command = spawn("bin/rails", ["runner", expandRubyScript(rubyScript)], {
    capture: ["stdout", "stderr"]
  }).then(parseSpawnResult);
  process.chdir(originalCwd);
  return command;
}
