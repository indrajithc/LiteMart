import express from "express";

import { rootDir, port } from "../config.mjs";
import { pageDirectory, pageFile } from "./common/constants.mjs";
import {
  checkLayouts,
  getAllDirectories,
  hasArrayElements,
} from "./common/utils/commonUtils.mjs";

const finalPageDirectory = `${rootDir}${pageDirectory}`;

// get directory structure

const directoryTree = getAllDirectories(finalPageDirectory);

const directoryStructure = directoryTree
  .map((directory) => {
    const directoryRoute = directory.replace(finalPageDirectory, "");
    return {
      route: directoryRoute.replace(/\[([^\]]+)\]/g, ":$1"),
      directory,
      layouts: checkLayouts(finalPageDirectory)(directoryRoute),
    };
  })
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
    // Import the default export inside the async function
    const { default: pageDefaultFunction } = await import(
      directory.directory + "/" + pageFile
    );

    // Call the imported function
    let result = await pageDefaultFunction(req.params);

    if (hasArrayElements(directory.layouts)) {
      for (const layout of directory.layouts) {
        const { default: layoutDefaultFunction } = await import(layout);
        if (typeof layoutDefaultFunction === "function") {
          result = await layoutDefaultFunction(result);
        }
      }
    }

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
