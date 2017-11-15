"use babel";

import path from "path";
import { exec } from "child_process";

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

const MAX_EXEC_BUFFER = 1024 * 1024;

export default function runInRails(railsRoot, rubyScript) {
  const railsBinaryPath = atom.config.get("rails-atom-schema.railsBinaryPath");

  return new Promise((resolve, reject) => {
    const originalCwd = process.cwd();
    let stdout = "";
    let stderr = "";

    process.chdir(railsRoot);
    const child = exec(
      `${railsBinaryPath} runner ${expandRubyScript(rubyScript)}`,
      {
        maxBuffer: MAX_EXEC_BUFFER
      }
    );
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
