const { Collection } = require("discord.js");
const path = require("node:path");
const fs = require("node:fs");
const logger = require("./Logger");

module.exports = (client) => {
  logger.log("Loading commands...");
  client.commands = new Collection();

  const foldersPath = path.join(require.main.path, "commands");
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);

      if (fs.lstatSync(filePath).isDirectory()) continue;
      // check if the file is a js file
      if (!file.endsWith(".js")) continue;

      const command = require(filePath);
      // Set a new item in the Collection with the key as the command name and the value as the exported module
      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
      } else {
        logger.warn(
          `The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }
  logger.success(`Loaded ${client.commands.size} commands`);
};
