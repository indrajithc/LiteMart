import express from "express";

import { rootDir, port } from "../config.mjs";
import { pageDirectory, pageFile } from "./common/constants.mjs";
import { getAllDirectories } from "./common/utils/commonUtils.mjs";

const finalPageDirectory = `${rootDir}${pageDirectory}`;

// get directory structure

const directoryTree = getAllDirectories(finalPageDirectory);

const directoryStructure = directoryTree
  .map((directory) => ({
    route: directory
      .replace(finalPageDirectory, "")
      .replace(/\[([^\]]+)\]/g, ":$1"),
    directory,
  }))
  .sort(
    (a, b) => b.directory.split("/").length - a.directory.split("/").length
  );

console.info("Page directory structure: ", directoryStructure);

if (directoryStructure.length === 0) {
  console.error("No pages found in the pages directory. Exiting...");
  process.exit(1);
}

const app = express();

directoryStructure.forEach((directory) => {
  console.info(`Adding route for ${directory?.route}`);
  app.get(directory.route, async (req, res) => {
    console.log("directory", directory);

    // Import the default export inside the async function
    const { default: pageDefaultFunction } = await import(
      directory.directory + "/" + pageFile
    );

    // Call the imported function
    const result = pageDefaultFunction(req.params);
    // const filePath
    return res.send(result);
  });
});

app.all("*", (req, res) => {
  res.send("This is the 404 page");
});

app.listen(port, () => {
  console.info(`Dev server started on http://localhost:${port}`);
});
