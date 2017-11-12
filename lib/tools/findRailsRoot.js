"use babel";

import path from "path";
import fs from "fs";

const modelToRailsRootCache = {};

function parentDirectory(origin) {
  return path.resolve(origin, "..");
}

function hasEveryChild(folder, children) {
  return children.every(child => {
    return fs.existsSync(path.resolve(folder, `./${child}`));
  });
}

function findRailsRoot(originPath) {
  if (originPath === "/") {
    return null;
  }

  const parent = parentDirectory(originPath);

  if (hasEveryChild(parent, ["Gemfile", "Rakefile"])) {
    return parent;
  } else {
    return findRailsRoot(parent);
  }
}

export default originPath => {
  if (modelToRailsRootCache[originPath]) {
    return modelToRailsRootCache[originPath];
  } else {
    const railsRoot = findRailsRoot(originPath);
    modelToRailsRootCache[originPath] = railsRoot;
    return railsRoot;
  }
};
