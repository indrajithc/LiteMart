import fs from "fs";
import path from "path";
import { layoutFile } from "../constants.mjs";
import { match } from "path-to-regexp";

export const hasArrayElements = (arr) => Array.isArray(arr) && arr.length > 0;

export function getAllDirectories(dirPath) {
  let results = [];

  const list = fs.readdirSync(dirPath);
  for (const file of list) {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Check if the directory contains an index.* file
      const indexFilePattern = /index\..*/;
      const hasIndexFile = fs
        .readdirSync(filePath)
        .some((f) => indexFilePattern.test(f));

      if (hasIndexFile) {
        // Add directory to the results
        results.push(filePath);
        // Recursively get subdirectories
      }
      results = results.concat(getAllDirectories(filePath));
    }
  }

  return results;
}

// Function to check if the layout file exists at a given path
export const checkLayouts = (baseDir) => (inputPath) => {
  const layoutFiles = [];
  let currentPath = inputPath;

  // Loop through the path and check for the layouts.mjs file at each level
  while (currentPath !== "/") {
    const layoutPath = path.join(baseDir, currentPath, layoutFile);

    // Check if the file exists
    if (fs.existsSync(layoutPath)) {
      layoutFiles.push(layoutPath);
    }

    // Move to the parent directory
    currentPath = path.dirname(currentPath);
  }

  // Check the root level '/layouts.mjs' as well
  const rootLayoutPath = path.join(baseDir, "/", layoutFile);
  if (fs.existsSync(rootLayoutPath)) {
    layoutFiles.push(rootLayoutPath);
  }

  return layoutFiles.sort((a, b) => b.split("/").length - a.split("/").length);
};

export function getMatchingRoute(pathname, directoryStructure) {
  for (const routeObj of directoryStructure) {
    const { route } = routeObj;

    // Create a path-to-regexp matcher
    console.log({ route });
    const matcher = match(route, { decode: decodeURIComponent });
    const result = matcher(pathname);

    if (result) {
      return { directory: routeObj, params: { ...(result.params || {}) } };
    }
  }

  return null;
}
