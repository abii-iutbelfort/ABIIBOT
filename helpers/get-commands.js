const path = require("node:path");
const fs = require("node:fs");
const logger = require("./Logger");
const foldersPath = path.join(require.main.path, "commands");
const commandFolders = fs.readdirSync(foldersPath);

const commands = [];
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      logger.error(
        `The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

module.exports = commands;
