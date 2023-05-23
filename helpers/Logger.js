const chalk = require("chalk");

class Logger {
  static log(message) {
    console.log(chalk`{blue.bold [INFO]}\t\t${message}`);
  }

  static error(message, error = "") {
    let errorString = chalk`{red.bold [ERROR]}\t\t${message}`;
    if (error) {
      errorString += `\n${error}`;
    }
    console.error(errorString);
  }

  static warn(message) {
    console.warn(chalk`{yellow.bold [WARN]}\t\t${message}`);
  }

  static success(message) {
    console.log(chalk`{green.bold [SUCCESS]}\t${message}`);
  }
}

// Logger.log("Display this message with the [INFO] tag in blue");
// Logger.warn("Display this message with the [WARN] tag in yellow");
// Logger.success("Display this message with the [SUCCESS] tag in green");
// Logger.error("Display this message with the [ERROR] tag in red");

module.exports = Logger;
