"use babel";

import path from "path";
import { spawn } from "child_process";

function expandRubyScript(scriptName) {
  return path.join(__dirname, `../ruby-scripts/${scriptName}.rb`);
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
        reject(new Error(reason));
      }
    });
    process.chdir(originalCwd);
  });
}
