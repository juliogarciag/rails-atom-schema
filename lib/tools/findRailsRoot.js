"use babel";

import path from "path";

const modelToRailsRootCache = {};

function parentDirectory(origin) {
  return path.resolve(origin, "..");
}

function findRailsRoot(originPath) {
  if (originPath === "/") {
    return null;
  }

  const parent = parentDirectory(originPath);

  if (path.basename(parent) === "app") {
    return parentDirectory(parent);
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
