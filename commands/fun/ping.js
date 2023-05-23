const {SlashCommandBuilder} = require('discord.js');

const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!')
  .addBooleanOption(option => option.setName('delay')
    .setDescription('Whether to display your ping'))

const execute = async (interaction) => {
  let msg = 'Pong !';
  if (interaction.options.getBoolean('delay')) msg += ` (${interaction.client.ws.ping}ms)`;
  await interaction.reply({content: msg, ephemeral: true});
};

const help = "Replies with Pong!\n" +
  "Options :\n" + "`delay` : Whether to display your ping (default false)\n" +
  "**Usage** : ```/ping [delay]```"

module.exports = {data, execute, help};
