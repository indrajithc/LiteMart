import fs from "fs";
import path from "path";

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
