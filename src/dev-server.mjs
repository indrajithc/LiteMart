import express from "express";

import { rootDir, port } from "../config.mjs";
import { pageDirectory } from "./common/constants.mjs";
import { getAllDirectories } from "./common/utils/commonUtils.mjs";

const finalPageDirectory = `${rootDir}${pageDirectory}`;

// get directory structure

const directoryTree = getAllDirectories(finalPageDirectory);

const directoryStructure = directoryTree
  .map((directory) =>
    directory.replace(finalPageDirectory, "").replace(/\[([^\]]+)\]/g, ":$1")
  )
  .sort((a, b) => b.split("/").length - a.split("/").length);

console.info("Page directory structure: ", directoryStructure);

if (directoryStructure.length === 0) {
  console.error("No pages found in the pages directory. Exiting...");
  process.exit(1);
}

const app = express();

directoryStructure.forEach((directory) => {
  console.info(`Adding route for ${directory}`);
  app.get(directory, (req, res) => {
    res.send(`This is the ${directory} page`);
  });
});

app.all("*", (req, res) => {
  res.send("This is the 404 page");
});

app.listen(port, () => {
  console.info(`Dev server started on http://localhost:${port}`);
});
