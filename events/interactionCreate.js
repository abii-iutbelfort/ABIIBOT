const { Events } = require("discord.js");
const logger = require("../helpers/Logger");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      logger.warn(`No command matching ${interaction.commandName} was found.`);
      return;
    }
    if (interaction.isChatInputCommand()) {
      try {
        await command.execute(interaction);
      } catch (error) {
        logger.error(`Error executing ${interaction.commandName}`, error);
      }
    } else if (interaction.isAutocomplete()) {
      try {
        await command.autocomplete(interaction);
      } catch (error) {
        logger.error(
          `Error executing autocomplete for ${interaction.commandName}`,
          error
        );
      }
    }
  },
};
