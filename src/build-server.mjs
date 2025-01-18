import fs from "fs";
import path from "path";
import { rootDir } from "../config.mjs";
import { buildDirectory } from "./common/constants.mjs";
import { getMatchingRoute } from "./common/utils/commonUtils.mjs";
import serverHandler, { directoryStructure } from "./server.mjs";

const getBuildPath = async () => {
  return ["/en", "/ar"];
};

const finalBuildDirectory = path.join(rootDir, buildDirectory);

// Function to handle building a route
async function buildRoute(pathname) {
  try {
    const { params, directory } = getMatchingRoute(
      pathname,
      directoryStructure
    );

    const result = await serverHandler(directory)({ params });

    const routePathDirectory = path.join(finalBuildDirectory, pathname);
    // Create build directory if it doesn't exist
    if (!fs.existsSync(routePathDirectory)) {
      fs.mkdirSync(routePathDirectory, { recursive: true });
    }

    const routePath = path.join(routePathDirectory, "index.html");

    // Write the generated content to the file
    fs.writeFileSync(routePath, result);
    console.info(`Generated file for route: ${directory.route}`);
  } catch (error) {
    console.error(`Error generating file for route: ${path}`, error);
  }
}

// Build all routes and output files
async function build() {
  const buildPaths = await getBuildPath();
  for (const buildPath of buildPaths) {
    await buildRoute(buildPath);
  }
}

build()
  .then(() => {
    console.info("Build process completed.");
  })
  .catch((error) => {
    console.error("Build process failed:", error);
  });
