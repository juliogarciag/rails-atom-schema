"use babel";

import path from "path";

function parentDirectory(origin) {
  return path.resolve(origin, "..");
}

export default function findRailsRoot(originPath) {
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
