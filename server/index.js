const express = require("express");
const debug = require("debug")("users:server");
const chalk = require("chalk");

const app = express();

const initializeServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellow(`Listen to port ${port}`));
      resolve(server);
    });

    server.on("error", (error) => {
      debug(chalk.red("There's been an error initializing the server"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`Port ${port} is already being used`));
      }
      reject();
    });

    server.on("close", () => {
      debug(chalk.yellow("Express server disconnected"));
    });
  });

module.exports = { app, initializeServer };
