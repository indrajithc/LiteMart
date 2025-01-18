import express from "express";

import { port } from "../config.mjs";
import serverHandler, { directoryStructure } from "./server.mjs";

const app = express();

directoryStructure.forEach((directory) => {
  console.info(`Adding route for ${directory?.route}`);
  app.get(directory.route, async (req, res) => {
    const result = await serverHandler(directory)(req, res);
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
