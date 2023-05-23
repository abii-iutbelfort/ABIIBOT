const { REST, Routes } = require("discord.js");
require("dotenv").config();

const logger = require("./helpers/Logger");

let commands;

switch (process.argv[2]) {
  case "deploy":
    commands = require("./helpers/get-commands");
    break;

  case "remove":
    commands = [];
    break;

  default:
    logger.error(
      `Invalid action provided : '${process.argv[2]}'. Please provide one of the following actions: deploy, remove`
    );
    process.exit(1);
}

const clientId = process.env.ABIIBOT_CLIENT_ID;
const token = process.env.ABIIBOT_TOKEN;

const rest = new REST().setToken(token);
(async () => {
  try {
    logger.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    let data;

    switch (process.argv[3]) {
      case "global":
        data = await rest.put(Routes.applicationCommands(clientId), {
          body: commands,
        });

        logger.success(
          `Successfully reloaded ${data.length} application (/) commands.`
        );
        break;

      case "guilds":
        const guilds = process.env.ABIIBOT_GUILDS.split(",");
        data = await Promise.all(
          guilds.map((guildId) =>
            rest.put(Routes.applicationGuildCommands(clientId, guildId), {
              body: commands,
            })
          )
        );

        logger.success(
          `Successfully reloaded ${data[0].length} slash commands in ${guilds.length} guilds`
        );
        break;

      default:
        logger.error(
          `Invalid scope provided : '${process.argv[3]}'. Please provide one of the following scopes: global, guilds`
        );
        process.exit(1);
    }
  } catch (error) {
    logger.error(error);
  }
})();
