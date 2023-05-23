const {SlashCommandBuilder} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coin')
    .setDescription('Flips a coin')
    .addBooleanOption(option =>
      option.setName('hidden')
        .setDescription('Whether to hide the result')),
  async execute(interaction) {
    const msg = Math.random() > 0.5 ? 'Heads' : 'Tails';
    const hidden = interaction.options.getBoolean('hidden') ?? true;
    await interaction.reply({content: msg, ephemeral: hidden});
  },
  help: "Flips a coin\n" +
    "Options :\n" +
    "`hidden` : Whether to hide the result (default true)\n" +
    "**Usage** : ```/coin [hidden]```"
}