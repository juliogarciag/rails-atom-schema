"use babel";

import path from "path";
import { spawn } from "child_process";

function expandRubyScript(scriptName) {
  return path.join(__dirname, `../ruby-scripts/${scriptName}.rb`);
}

function logRailsRunFailure(failurePayload) {
  /* eslint-disable no-console */
  console.log("------------");
  console.log("Running ruby script has failed:");
  console.log(failurePayload);
  console.log("------------");
  /* eslint-enable no-console */
}

export default function runInRails(railsRoot, rubyScript) {
  return new Promise((resolve, reject) => {
    const originalCwd = process.cwd();
    let stdout = "";
    let stderr = "";

    process.chdir(railsRoot);
    const child = spawn("bin/rails", ["runner", expandRubyScript(rubyScript)]);
    child.stdout.on("data", data => (stdout += data));
    child.stderr.on("data", data => (stderr += data));
    child.on("exit", (code, reason) => {
      if (code === 0) {
        resolve(JSON.parse(stdout));
      } else {
        logRailsRunFailure({ code, reason, stdout, stderr });
        reject(new Error(reason));
      }
    });
    process.chdir(originalCwd);
  });
}
