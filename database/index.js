const debug = require("debug")("users:database");
const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = (connectionString) =>
  new Promise((resolve, reject) => {
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-underscore-dangle
        delete ret._id;
        // eslint-disable-next-line no-underscore-dangle
        delete ret.__id;
      },
    });

    mongoose.connect(connectionString, (error) => {
      if (error) {
        debug(chalk.red("Not able to initialize database connection"));
        debug(chalk.red(error.message));
        reject(error);
      }
      debug(chalk.green("Conected to database"));
      resolve();
    });

    mongoose.connection.on("close", () => {
      debug(chalk.green("Disconnected from database"));
    });
  });

module.exports = connectDB;
